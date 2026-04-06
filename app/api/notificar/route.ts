import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: 'Pendiente: implementación de notificación por WhatsApp (Paso 4).'
    },
    { status: 501 }
  );
}
