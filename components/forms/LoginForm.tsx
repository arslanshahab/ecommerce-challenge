"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/components/InputField";

type LoginInputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <InputField
        label="اسم المستخدم"
        error={errors.username?.message}
        {...register("username", {
          required: "اسم المستخدم مطلوب",
          minLength: {
            value: 3,
            message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل",
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
