"use client";

import { useSSE } from "@/hooks/useSSE";
import { useState, useEffect } from "react";

export default function ActivityFeed() {
  const { events } = useSSE("/api/sse/vouchers");
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    if (events) {
      setActivity((prev) => [events, ...prev].slice(0, 10));
    }
  }, [events]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

      <div className="space-y-2 text-sm">
        {activity.length === 0 && (
          <p className="text-gray-500">No recent activity.</p>
        )}

        {activity.map((item, idx) => (
          <div key={idx} className="border-b pb-2">
            <p>{item.message}</p>
            <p className="text-xs text-gray-500">{item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}