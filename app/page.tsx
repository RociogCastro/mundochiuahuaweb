import Formulario from '@/components/Formulario';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10 md:px-8">
      <section className="rounded-3xl bg-gradient-to-br from-amber-100 to-orange-50 p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-amber-900">Mundo Chihuahua</h1>
        <p className="mt-3 max-w-2xl text-zinc-700">
          Somos un criadero familiar enfocado en el cuidado responsable y amoroso de cada cachorro.
          Si querés sumarte a nuestra lista de espera, completá este cuestionario y te contactaremos
          cuando haya disponibilidad.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-zinc-900">Formulario de lista de espera</h2>
        <p className="mt-1 text-zinc-600">
          Nos ayuda a conocerte mejor y encontrar la mejor familia para cada chihuahua 🐶
        </p>
        <Formulario />
      </section>
    </main>
  );
}
