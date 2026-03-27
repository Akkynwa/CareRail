import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(async () => {
        const latest = await prisma.activity.findFirst({
          where: { beneficiaryId: session.id },
          orderBy: { createdAt: "desc" },
        });

        controller.enqueue(
          `data: ${JSON.stringify(latest)}\n\n`
        );
      }, 4000);

      req.signal.addEventListener("abort", () => clearInterval(interval));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
    },
  });
}