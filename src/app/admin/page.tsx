"use client";

import AdminLoginForm from "@/components/Forms/Admin/AdminLoginForm/AdminLoginForm";
import { useGetTodosQuery } from "@/lib/features/api";
import { usersActions } from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

function LoginPage() {
  return (
    <div className="bg-[url('/bg-gradient.png')] bg-no-repeat bg-center min-h-screen flex flex-col items-center justify-center gap-8">
      <AdminLoginForm />
    </div>
  );
}

export default LoginPage;
