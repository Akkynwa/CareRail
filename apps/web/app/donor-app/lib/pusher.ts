export function sendSSE(res: any, data: string) {
  res.write(`data: ${data}\n\n`);
}