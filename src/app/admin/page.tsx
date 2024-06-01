import AdminLoginForm from "@/components/Forms/Admin/AdminLoginForm/AdminLoginForm";

function LoginPage() {
  return (
    <div className="bg-gradient-to-r  from-mainColor to-cyan-500 min-h-screen flex flex-col items-center justify-center gap-8">
      <AdminLoginForm />
    </div>
  );
}

export default LoginPage;
