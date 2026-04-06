'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RespuestasFormulario } from '@/lib/tipos';

type ErroresFormulario = Partial<Record<keyof RespuestasFormulario, string>>;

const initialForm: RespuestasFormulario = {
  nombre: '',
  whatsapp: '',
  email: '',
  motivo: '',
  otrosAnimales: '',
  ninosEdades: '',
  vivienda: '',
  experiencia: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(form: RespuestasFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (!form.nombre.trim()) {
    errores.nombre = 'Tu nombre es obligatorio.';
  }

  if (!form.whatsapp.trim()) {
    errores.whatsapp = 'Tu WhatsApp es obligatorio.';
  }

  if (form.email && !emailRegex.test(form.email)) {
    errores.email = 'Ingresá un email válido.';
  }

  if (!form.motivo.trim() || form.motivo.trim().length < 10) {
    errores.motivo = 'Contanos un poco más (mínimo 10 caracteres).';
  }

  if (!form.otrosAnimales.trim()) {
    errores.otrosAnimales = 'Esta respuesta es obligatoria.';
  }

  if (!form.ninosEdades.trim()) {
    errores.ninosEdades = 'Esta respuesta es obligatoria.';
  }

  if (!form.vivienda.trim()) {
    errores.vivienda = 'Esta respuesta es obligatoria.';
  }

  if (!form.experiencia.trim()) {
    errores.experiencia = 'Esta respuesta es obligatoria.';
  }

  return errores;
}

export default function Formulario() {
  const router = useRouter();
  const [form, setForm] = useState<RespuestasFormulario>(initialForm);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [estadoEnvio, setEstadoEnvio] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorGlobal, setErrorGlobal] = useState('');

  const isSubmitting = useMemo(() => estadoEnvio === 'sending', [estadoEnvio]);

  const setField = (field: keyof RespuestasFormulario, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrores((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorGlobal('');

    const nextErrores = validar(form);
    setErrores(nextErrores);

    if (Object.keys(nextErrores).length > 0) {
      return;
    }

    try {
      setEstadoEnvio('sending');

      const resp = await fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await resp.json();

      if (!resp.ok || !data?.ok) {
        throw new Error(data?.message || 'No pudimos enviar tu solicitud por ahora.');
      }

      router.push('/gracias');
    } catch (error) {
      setEstadoEnvio('error');
      setErrorGlobal(
        error instanceof Error ? error.message : 'No pudimos enviar tu solicitud por ahora.'
      );
    } finally {
      setEstadoEnvio('idle');
    }
  };

  const renderError = (field: keyof RespuestasFormulario) => {
    if (!errores[field]) return null;
    return <p className="mt-1 text-sm text-red-600">{errores[field]}</p>;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <Campo
        label="Nombre completo"
        value={form.nombre}
        onChange={(value) => setField('nombre', value)}
        placeholder="Ej: Rocío Castro"
      >
        {renderError('nombre')}
      </Campo>

      <Campo
        label="WhatsApp"
        value={form.whatsapp}
        onChange={(value) => setField('whatsapp', value)}
        placeholder="Ej: +54 9 11 1234-5678"
      >
        {renderError('whatsapp')}
      </Campo>

      <Campo
        label="Email (opcional)"
        value={form.email ?? ''}
        onChange={(value) => setField('email', value)}
        placeholder="Ej: familia@email.com"
        type="email"
      >
        {renderError('email')}
      </Campo>

      <CampoArea
        label="¿Por qué querés un chihuahua?"
        value={form.motivo}
        onChange={(value) => setField('motivo', value)}
      >
        {renderError('motivo')}
      </CampoArea>

      <CampoArea
        label="¿Tenés otros animales en casa?"
        value={form.otrosAnimales}
        onChange={(value) => setField('otrosAnimales', value)}
      >
        {renderError('otrosAnimales')}
      </CampoArea>

      <CampoArea
        label="¿Tenés niños? ¿Qué edades?"
        value={form.ninosEdades}
        onChange={(value) => setField('ninosEdades', value)}
      >
        {renderError('ninosEdades')}
      </CampoArea>

      <Campo
        label="¿Vivís en casa o departamento?"
        value={form.vivienda}
        onChange={(value) => setField('vivienda', value)}
        placeholder="Ej: departamento con balcón"
      >
        {renderError('vivienda')}
      </Campo>

      <CampoArea
        label="¿Tenés experiencia con perros?"
        value={form.experiencia}
        onChange={(value) => setField('experiencia', value)}
      >
        {renderError('experiencia')}
      </CampoArea>

      {errorGlobal ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{errorGlobal}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-400"
      >
        {isSubmitting ? 'Enviando...' : 'Quiero anotarme en la lista de espera'}
      </button>
    </form>
  );
}

type CampoProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email';
  children?: React.ReactNode;
};

function Campo({ label, value, onChange, placeholder, type = 'text', children }: CampoProps) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-sm font-medium text-zinc-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
      {children}
    </label>
  );
}

type CampoAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
};

function CampoArea({ label, value, onChange, children }: CampoAreaProps) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-sm font-medium text-zinc-800">{label}</span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
      {children}
    </label>
  );
}
