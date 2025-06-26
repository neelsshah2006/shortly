import { useRouter } from "next/router";
import Stats from "../../views/Stats";

export default function StatsPage() {
  const { query } = useRouter();
  return <Stats shortCode={query.shortCode} />;
}
