"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./Card";

export function LiveFeedCard() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const ev = new EventSource("/api/live");
    ev.onmessage = (e) => {
      setEvents((prev) => [e.data, ...prev]);
    };
    return () => ev.close();
  }, []);

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-3">Live Activity</h2>

      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {events.map((item, i) => (
          <div key={i} className="text-sm text-gray-800 dark:text-gray-200">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}