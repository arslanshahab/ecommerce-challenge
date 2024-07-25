import SignUpForm from "@/components/forms/SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col text-center items-center justify-center mb-6">
        <h2 className="text-lg">{"إنشاء حساب جديد"}</h2>
        <span className="text-xs text-gray-500">{"قم بإنشاء حساب جديد للبدء في التسوق"}</span>
      </div>
      <SignUpForm />
    </>
  );
}
