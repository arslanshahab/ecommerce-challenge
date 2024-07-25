"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { authApi } from "@/services/auth";
import { useAuthContext } from "@/contexts/AuthContext";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputs>();
  // const router = useRouter();
  const { saveAuthToken } = useAuthContext();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await authApi.signIn(data);
      console.log("Login successful:", response);
      if (response.status === "success" && response.token) {
        saveAuthToken(response.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <InputField
        label="البريد الإلكتروني"
        error={errors.email?.message}
        {...register("email", {
          required: "البريد الإلكتروني مطلوب",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "الرجاء إدخال بريد إلكتروني صحيح",
          },
        })}
      />
      <InputField
        label="كلمة المرور"
        type="password"
        error={errors.password?.message}
        {...register("password", {
          required: "كلمة المرور مطلوبة",
          minLength: {
            value: 6,
            message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
          },
        })}
      />
      {errors.root && (
        <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md"
        >
          دخول
        </button>
        <button
          type="button"
          className="w-fit text-primary underline p-2 text-md rounded-md"
        >
          نسيت كلمة المرور؟
        </button>
      </div>
    </form>
  );
}
