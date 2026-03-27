import { prisma } from "@carerail/db";

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = async () => {
        // Fetch last 5 redeemed vouchers
        const recent = await prisma.transaction.findMany({
          where: { type: "VOUCHER_REDEEMED" },
          include: { vendor: true, beneficiary: true, voucher: true },
          orderBy: { createdAt: "desc" },
          take: 5,
        });

        const data = recent.map(tx => ({
          beneficiary: tx.beneficiary?.fullName,
          vendor: tx.vendor?.businessName,
          amount: tx.amount,
          purpose: tx.voucher?.purpose,
          time: tx.createdAt,
        }));

        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send immediately
      await sendEvent();

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