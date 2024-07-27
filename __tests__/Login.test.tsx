import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { authApi } from "@/services/auth";
import Login from "@/app/(auth)/login/page";
import { AuthProvider } from "@/contexts/AuthContext";

jest.mock("@/services/auth");

describe("Login", () => {
  beforeEach(() => {
    (authApi.signIn as jest.Mock).mockClear();
  });

  test("renders login form", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText(/البريد الإلكتروني/i)).toBeInTheDocument();
    expect(screen.getByText(/كلمة المرور/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /دخول/i })).toBeInTheDocument();
  });

  test("handles login", async () => {
    (authApi.signIn as jest.Mock).mockResolvedValue({ token: "fake-token" });

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const emailInput = screen.getByPlaceholderText("البريد الإلكتروني");
    const passwordInput = screen.getByPlaceholderText("كلمة المرور");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /دخول/i }));

    await waitFor(() => {
      expect(authApi.signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(screen.queryByText(/Invalid credentials/i)).not.toBeInTheDocument();
  });
});
