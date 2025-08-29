import RegisterForm from "../../../islands/auth/RegisterForm.tsx";

export default function register() {
  return (
    <div class="flex flex-col px-4 py-8 mx-auto bg-slate-200 h-screen">
      <div class="flex flex-col items-center justify-center flex-1">
        <RegisterForm />
      </div>
    </div>
  )
}