import { authFromHeader } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(async () => {
        const balance = await prisma.beneficiaryBalance.findUnique({
          where: { beneficiaryId: session.id },
        });

        controller.enqueue(`data: ${balance?.amount || 0}\n\n`);
      }, 5000);

      req.signal.addEventListener("abort", () => clearInterval(interval));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}