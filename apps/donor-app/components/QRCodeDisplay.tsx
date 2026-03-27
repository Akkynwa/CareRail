"use client";
import React from "react";

export default function QRCodeDisplay({ value }: { value: string }) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value)}`;
  return <img src={qrSrc} alt="QR Code" className="mx-auto my-2" />;
}