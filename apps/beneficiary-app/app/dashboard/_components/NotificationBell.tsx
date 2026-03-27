"use client";

import { Bell } from "lucide-react";
import { useSSE } from "@/hooks/useSSE";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const { events } = useSSE("/api/sse/notifications");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((c) => c + 1);
  }, [events]);

  return (
    <button className="relative p-2 rounded-full hover:bg-gray-100">
      <Bell size={22} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5">
          {count}
        </span>
      )}
    </button>
  );
}