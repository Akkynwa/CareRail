export const connectVendorSSE = (
  vendorId: string,
  onMessage: (data: any) => void
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/vendor/sse/${vendorId}`;

  const events = new EventSource(url);

  events.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error('Invalid SSE payload:', err);
    }
  };

  events.onerror = (err) => {
    console.warn('SSE disconnected:', err);
  };

  return () => events.close();
};