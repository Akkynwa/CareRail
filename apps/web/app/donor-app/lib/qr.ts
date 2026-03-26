import QRCode from "qrcode";

export async function generateQR(value: string) {
  try {
    return await QRCode.toDataURL(value);
  } catch (err) {
    console.error(err);
    return "";
  }
}