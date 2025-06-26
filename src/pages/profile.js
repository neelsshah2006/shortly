import Profile from "../views/Profile";
import ProtectedRoute from "../components/routing/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
