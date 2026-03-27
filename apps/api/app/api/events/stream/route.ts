import { NextRequest } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Set up Server-Sent Events headers
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        // Send initial connection message
        controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'));

        // Poll for new events every 5 seconds
        const interval = setInterval(async () => {
          try {
            // Fetch recent transactions based on user role
            let transactions;

            if (session.role === 'donor') {
              transactions = await prisma.transaction.findMany({
                where: { donorId: session.userId },
                orderBy: { createdAt: 'desc' },
                take: 1,
              });
            } else if (session.role === 'beneficiary') {
              transactions = await prisma.transaction.findMany({
                where: { beneficiaryId: session.userId },
                orderBy: { createdAt: 'desc' },
                take: 1,
              });
            } else if (session.role === 'vendor') {
              transactions = await prisma.transaction.findMany({
                where: { vendorId: session.userId },
                orderBy: { createdAt: 'desc' },
                take: 1,
              });
            }

            if (transactions && transactions.length > 0) {
              const event = {
                type: 'transaction',
                data: transactions[0],
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
            }
          } catch (error) {
            console.error('SSE error:', error);
          }
        }, 5000);

        // Clean up interval on connection close
        request.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });
      },
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Events stream error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}