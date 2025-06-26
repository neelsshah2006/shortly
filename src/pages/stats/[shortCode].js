import { useRouter } from "next/router";
import Stats from "../../views/Stats";
import ProtectedRoute from "../../components/routing/ProtectedRoute";

export default function StatsPage() {
  const { query } = useRouter();
  return (
    <ProtectedRoute>
      <Stats shortCode={query.shortCode} />
    </ProtectedRoute>
  );
}
