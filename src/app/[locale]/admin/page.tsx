"use client";

import AdminLoginForm from "@/components/Forms/Admin/AdminLoginForm/AdminLoginForm";
import ProtectedRoute from "@/ui/ProtectedRoute/ProtectedRoute";

function LoginPage() {
  return (
    <div className="bg-[url('/bg-gradient.png')] bg-no-repeat bg-center min-h-screen flex flex-col items-center justify-center gap-8">
      <ProtectedRoute>
        <AdminLoginForm />
      </ProtectedRoute>
    </div>
  );
}

export default LoginPage;
