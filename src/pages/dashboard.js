import Dashboard from "../views/Dashboard";
import ProtectedRoute from "../components/routing/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
