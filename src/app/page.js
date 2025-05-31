"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Home() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      const qrScanner = new Html5Qrcode("scanner");

      qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setResult(decodedText);
          qrScanner.stop();
          setScanning(false);
          // Enviar resultado a API
          fetch("/api/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qr: decodedText }),
          });
        },
        (error) => {
          // console.warn("QR scan error", error);
        }
      ).catch(console.error);

      scannerRef.current = qrScanner;

      return () => {
        qrScanner.stop().catch(() => {});
      };
    }
  }, [scanning]);

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
      {scanning ? (
        <>
          <div id="scanner" style={{ width: 300, height: 300 }} />
          <button
            onClick={() => {
              if (scannerRef.current) {
                scannerRef.current.stop();
                setScanning(false);
              }
            }}
            style={{ marginTop: 20 }}
          >
            Detener escaneo
          </button>
        </>
      ) : (
        <button onClick={() => setScanning(true)}>Escanear QR</button>
      )}

      {result && <p>Resultado QR: {result}</p>}
    </main>
  );
}
