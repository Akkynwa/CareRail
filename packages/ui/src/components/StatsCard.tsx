import { Card } from "./Card";

export function StatsCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </Card>
  );
}