import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { authApi } from "@/services/auth";
import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { apiService } from "@/services/api";

jest.mock("@/services/auth");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/contexts/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));
jest.mock("react-hot-toast");
jest.mock("@/services/api");

describe("LoginForm", () => {
  const mockPush = jest.fn();
  const mockSaveAuthToken = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthContext as jest.Mock).mockReturnValue({ saveAuthToken: mockSaveAuthToken });
    (authApi.signIn as jest.Mock).mockClear();
    (toast.success as jest.Mock).mockClear();
    (apiService.setAccessToken as jest.Mock).mockClear();
  });

  test("renders login form", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("البريد الإلكتروني")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("كلمة المرور")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /دخول/i })).toBeInTheDocument();
  });

  test("handles successful login", async () => {
    const fakeToken = "fake-token";
    (authApi.signIn as jest.Mock).mockResolvedValue({ status: "success", token: fakeToken });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("البريد الإلكتروني"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("كلمة المرور"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /دخول/i }));

    await waitFor(() => {
      expect(authApi.signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockSaveAuthToken).toHaveBeenCalledWith(fakeToken);
      expect(apiService.setAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(toast.success).toHaveBeenCalledWith("Login successful");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  test("handles login failure", async () => {
    (authApi.signIn as jest.Mock).mockRejectedValue(new Error("Login failed"));

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("البريد الإلكتروني"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("كلمة المرور"), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByRole("button", { name: /دخول/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  test("validates email format", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("البريد الإلكتروني");
    
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("الرجاء إدخال بريد إلكتروني صحيح")).toBeInTheDocument();
    });
  });

  test("validates required fields", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /دخول/i }));

    await waitFor(() => {
      expect(screen.getByText("البريد الإلكتروني مطلوب")).toBeInTheDocument();
      expect(screen.getByText("كلمة المرور مطلوبة")).toBeInTheDocument();
    });
  });

  test("validates password length", async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText("كلمة المرور");
    
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("كلمة المرور يجب أن تكون 6 أحرف على الأقل")).toBeInTheDocument();
    });
  });
});