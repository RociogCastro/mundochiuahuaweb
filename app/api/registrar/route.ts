import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { InteresadoInsert, RespuestasFormulario } from '@/lib/tipos';

function normalizar(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : '';
}

function validarPayload(payload: unknown) {
  const data = payload as Partial<RespuestasFormulario>;

  const nombre = normalizar(data?.nombre);
  const whatsapp = normalizar(data?.whatsapp);
  const email = normalizar(data?.email);
  const motivo = normalizar(data?.motivo);
  const otrosAnimales = normalizar(data?.otrosAnimales);
  const ninosEdades = normalizar(data?.ninosEdades);
  const vivienda = normalizar(data?.vivienda);
  const experiencia = normalizar(data?.experiencia);

  if (!nombre || !whatsapp || !motivo || !otrosAnimales || !ninosEdades || !vivienda || !experiencia) {
    return {
      ok: false as const,
      error: 'Faltan campos obligatorios del formulario.'
    };
  }

  const registro: InteresadoInsert = {
    nombre,
    whatsapp,
    email: email || null,
    respuestas: {
      motivo,
      otrosAnimales,
      ninosEdades,
      vivienda,
      experiencia
    }
  };

  return { ok: true as const, registro };
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const validacion = validarPayload(payload);

    if (!validacion.ok) {
      return NextResponse.json({ ok: false, message: validacion.error }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('interesados')
      .insert(validacion.registro)
      .select('id')
      .single();

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: 'No pudimos guardar tu solicitud en este momento.',
          detail: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al procesar el formulario.'
      },
      { status: 500 }
    );
  }
}
