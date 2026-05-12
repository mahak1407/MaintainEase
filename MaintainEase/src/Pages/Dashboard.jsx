import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import ResidentDashboard from "./dashboard/ResidentDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import TechnicianDashboard from "./dashboard/TechnicianDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "resident") {
    return (
      <DashboardLayout title="Resident hub">
        <ResidentDashboard />
      </DashboardLayout>
    );
  }
  if (user.role === "admin" || user.role === "sub_admin") {
    return (
      <DashboardLayout title="Administration">
        <AdminDashboard isAdmin={user.role === "admin"} />
      </DashboardLayout>
    );
  }
  if (user.role === "technician") {
    return (
      <DashboardLayout title="Technician workspace">
        <TechnicianDashboard />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <p className="text-slate-600">Unknown role.</p>
    </DashboardLayout>
  );
}
