export type RespuestasFormulario = {
  nombre: string;
  whatsapp: string;
  email?: string;
  motivo: string;
  otrosAnimales: string;
  ninosEdades: string;
  vivienda: string;
  experiencia: string;
};

export type InteresadoInsert = {
  nombre: string;
  whatsapp: string;
  email: string | null;
  respuestas: {
    motivo: string;
    otrosAnimales: string;
    ninosEdades: string;
    vivienda: string;
    experiencia: string;
  };
};
