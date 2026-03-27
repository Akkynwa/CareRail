"use client";

import React, { useEffect, useRef } from "react";
import jsQR from "jsqr";

export default function Scanner({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    };
    startVideo();

    const scanLoop = () => {
      const video = videoRef.current;
      if (!video) return;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) onScan(code.data);
      }

      requestAnimationFrame(scanLoop);
    };

    scanLoop();
  }, [onScan]);

  return <video ref={videoRef} className="w-full h-auto rounded-lg" autoPlay />;
}