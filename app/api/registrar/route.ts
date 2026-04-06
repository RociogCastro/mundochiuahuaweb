import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: 'Pendiente: implementación de guardado en Supabase (Paso 3).'
    },
    { status: 501 }
  );
}
app/globals.css
