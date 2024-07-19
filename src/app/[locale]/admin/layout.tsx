"use client";

import CustomErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";

interface Props {
  children: React.ReactNode;
}

function AdminDashboardPage({ children }: Props) {
  return <CustomErrorBoundary>{children}</CustomErrorBoundary>;
}

export default AdminDashboardPage;
