import AuthForm from "../../../islands/auth/AuthForm.tsx";

export default function login() {
  return (
    <div class="flex flex-col px-4 py-8 mx-auto bg-slate-200 h-screen">
      <div class="flex flex-col items-center justify-center flex-1">
        <AuthForm />
      </div>
    </div>
  )
}