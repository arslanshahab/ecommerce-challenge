"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { authApi } from "@/services/auth";
import Link from "next/link";
import toast from "react-hot-toast";

type SignUpInputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    trigger,
  } = useForm<SignUpInputs>({
    mode: "onBlur",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await authApi.signUp({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      if (response.status === "success") {
        toast.success("Signup successful")
        router.push("/login");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("root", {
        type: "manual",
        message: "Signup failed. Please try again.",
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
          onBlur={() => trigger("email")}
      />
      <InputField
        label="الاسم الأول"
        error={errors.firstName?.message}
        {...register("firstName", {
          required: "الاسم الأول مطلوب",
          minLength: {
            value: 2,
            message: "الاسم الأول يجب أن يكون حرفين على الأقل",
          },
        })}
          onBlur={() => trigger("firstName")}
      />
      <InputField
        label="اسم العائلة"
        error={errors.lastName?.message}
        {...register("lastName", {
          required: "اسم العائلة مطلوب",
          minLength: {
            value: 2,
            message: "اسم العائلة يجب أن يكون حرفين على الأقل",
          },
        })}
          onBlur={() => trigger("lastName")}
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
          onBlur={() => trigger("password")}
      />
      <InputField
        label="تأكيد كلمة المرور"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "تأكيد كلمة المرور مطلوب",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "كلمات المرور غير متطابقة";
            }
          },
        })}
          onBlur={() => trigger("confirmPassword")}
      />
      {errors.root && (
        <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md"
        >
          إنشاء حساب
        </button>
        <Link
          href="/login"
          className="w-fit text-primary underline p-2 text-md rounded-md hover:bg-opacity-25"
        >
          تسجيل الدخول
        </Link>
      </div>
    </form>
  );
}
