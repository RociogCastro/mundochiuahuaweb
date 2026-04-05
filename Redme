# 🐾 Mundo Chihuahua — Página Pública

Página web de lista de espera para el criadero Mundo Chihuahua. Permite a familias interesadas en adoptar un chihuahua anotarse completando un cuestionario, que luego es enviado automáticamente al CRM del criadero.

---

## ¿Qué hace esta página?

- Presenta el criadero con nombre y descripción
- Muestra un formulario/cuestionario para que el visitante se anote en la lista de espera
- Guarda las respuestas en la base de datos (Supabase)
- Envía una notificación por WhatsApp a la dueña cuando alguien se anota
- Muestra una página de confirmación al finalizar el formulario

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Next.js (App Router) | Framework principal |
| Tailwind CSS | Estilos |
| shadcn/ui | Componentes de interfaz |
| Supabase | Base de datos |
| Twilio / CallMeBot | Notificaciones WhatsApp |
| Vercel | Hosting y deploy |

---

## Estructura de archivos

```
app/
├── page.tsx                  # Página principal con el formulario
├── gracias/
│   └── page.tsx              # Confirmación post-formulario
└── api/
    ├── registrar/
    │   └── route.ts          # Guarda el interesado en Supabase
    └── notificar/
        └── route.ts          # Envía WhatsApp a la dueña

components/
└── Formulario.tsx            # Componente del cuestionario

lib/
├── supabase.ts               # Cliente de Supabase
├── whatsapp.ts               # Función para enviar notificación
└── tipos.ts                  # Tipos TypeScript
```

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase

# WhatsApp (elegir una opción)
TWILIO_ACCOUNT_SID=tu_sid_de_twilio
TWILIO_AUTH_TOKEN=tu_token_de_twilio
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# O con CallMeBot (gratis)
CALLMEBOT_PHONE=numero_de_whatsapp_de_la_duena
CALLMEBOT_API_KEY=tu_api_key_de_callmebot
```

---

## Instalación y uso local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/mundo-chihuahua.git
cd mundo-chihuahua

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves

# 4. Correr en desarrollo
npm run dev

# 5. Abrir en el navegador
http://localhost:3000
```

---

## Base de datos — Tabla requerida en Supabase

Ejecutar este SQL en el editor de Supabase:

```sql
create table interesados (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  whatsapp text not null,
  email text,
  estado text default 'nuevo',
  notas text,
  fecha_registro timestamp default now(),
  respuestas jsonb
);
```

---

## Preguntas del formulario (por defecto)

1. ¿Cuál es tu nombre completo?
2. ¿Cuál es tu WhatsApp?
3. ¿Cuál es tu email?
4. ¿Por qué querés un chihuahua?
5. ¿Tenés otros animales en casa?
6. ¿Tenés niños? ¿Qué edades?
7. ¿Vivís en casa o departamento?
8. ¿Tenés experiencia con perros?

> Las preguntas se pueden editar desde el panel CRM (Fase 2).

---

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar variables de entorno en el dashboard de Vercel:
# vercel.com > tu proyecto > Settings > Environment Variables
```

---

## Flujo del usuario

```
Visita la página
      ↓
Lee presentación del criadero
      ↓
Completa el cuestionario
      ↓
Envía el formulario
      ↓
Sus respuestas se guardan en Supabase
      ↓
La dueña recibe notificación por WhatsApp
      ↓
El usuario ve página de confirmación ✅
```

---

## Estado del proyecto

- [x] Diseño de la estructura
- [ ] Página principal con formulario
- [ ] Integración con Supabase
- [ ] Notificación por WhatsApp
- [ ] Página de confirmación
- [ ] Deploy en Vercel

---

*Proyecto: Mundo Chihuahua*
*Parte 1 de 2 — Página Pública*
