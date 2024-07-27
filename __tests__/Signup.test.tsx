import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { authApi } from "@/services/auth";
import SignUpForm from "@/components/forms/SignUpForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

jest.mock("@/services/auth");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-hot-toast");

describe("SignUpForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (authApi.signUp as jest.Mock).mockClear();
    (toast.success as jest.Mock).mockClear();
  });

  test("renders signup form", () => {
    render(<SignUpForm />);

    expect(screen.getByPlaceholderText("البريد الإلكتروني")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("الاسم الأول")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("اسم العائلة")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("كلمة المرور")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("تأكيد كلمة المرور")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /إنشاء حساب/i })).toBeInTheDocument();
  });

  test("handles successful signup", async () => {
    (authApi.signUp as jest.Mock).mockResolvedValue({ status: "success" });

    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("البريد الإلكتروني"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("الاسم الأول"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("اسم العائلة"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("كلمة المرور"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("تأكيد كلمة المرور"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /إنشاء حساب/i }));

    await waitFor(() => {
      expect(authApi.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Signup successful");
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  test("handles signup failure", async () => {
    (authApi.signUp as jest.Mock).mockRejectedValue(new Error("Signup failed"));

    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("البريد الإلكتروني"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("الاسم الأول"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("اسم العائلة"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("كلمة المرور"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("تأكيد كلمة المرور"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /إنشاء حساب/i }));

    await waitFor(() => {
      expect(screen.getByText("Signup failed. Please try again.")).toBeInTheDocument();
    });
  });

  test("validates email format", async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("البريد الإلكتروني"), { target: { value: "invalid-email" } });
    fireEvent.blur(screen.getByPlaceholderText("البريد الإلكتروني"));

    await waitFor(() => {
      expect(screen.getByText("الرجاء إدخال بريد إلكتروني صحيح")).toBeInTheDocument();
    });
  });

  test("validates password match", async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("كلمة المرور"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("تأكيد كلمة المرور"), { target: { value: "password456" } });
    fireEvent.blur(screen.getByPlaceholderText("تأكيد كلمة المرور"));

    await waitFor(() => {
      expect(screen.getByText("كلمات المرور غير متطابقة")).toBeInTheDocument();
    });
  });

  test("validates required fields", async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole("button", { name: /إنشاء حساب/i }));

    await waitFor(() => {
      expect(screen.getByText("البريد الإلكتروني مطلوب")).toBeInTheDocument();
      expect(screen.getByText("الاسم الأول مطلوب")).toBeInTheDocument();
      expect(screen.getByText("اسم العائلة مطلوب")).toBeInTheDocument();
      expect(screen.getByText("كلمة المرور مطلوبة")).toBeInTheDocument();
      expect(screen.getByText("تأكيد كلمة المرور مطلوب")).toBeInTheDocument();
    });
  });
});