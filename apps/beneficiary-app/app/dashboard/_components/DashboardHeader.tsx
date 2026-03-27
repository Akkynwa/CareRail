"use client";

export default function DashboardHeader({
  name,
  rightSlot,
}: {
  name: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Hello, {name}</h1>
      {rightSlot}
    </header>
  );
}