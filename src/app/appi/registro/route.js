export async function POST(request) {
  const { qr } = await request.json();

  console.log("QR recibido:", qr);

  // Aquí podrías agregar lógica (guardar en DB, validar, etc.)

  return new Response(JSON.stringify({ message: "QR registrado correctamente" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
