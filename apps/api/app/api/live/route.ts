// apps/api/src/app/api/live/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = () => {
        controller.enqueue(
          `data: Voucher redeemed at ${new Date().toISOString()}\n\n`
        );
      };

      const interval = setInterval(sendEvent, 3000);

      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}