"use client";
import React, { useEffect, useState } from "react";
import { useDonor } from "../context/DonorContext";
import { Card } from "@carerail/ui";

export default function LiveFeedCard() {
  const { donor } = useDonor();
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!donor) return;
    const eventSource = new EventSource(`/api/dashboard/live?donorId=${donor.id}`);

    eventSource.onmessage = (e) => {
      setEvents((prev) => [e.data, ...prev].slice(0, 20));
    };

    return () => eventSource.close();
  }, [donor]);

  if (!donor) return <Card>Loading donor info...</Card>;

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-3">Live Activity</h2>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {events.map((event, i) => (
          <p key={i} className="text-sm text-gray-800 dark:text-gray-200">{event}</p>
        ))}
      </div>
    </Card>
  );
}