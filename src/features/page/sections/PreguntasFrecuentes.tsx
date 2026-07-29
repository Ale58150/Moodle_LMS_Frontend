import {
  BookOpen,
  CreditCard,
  GraduationCap,
  MapPin,
  Monitor,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PreguntasFrecuentes {
  id: number;
  pregunta: string;
  respuesta: string;
  icono: LucideIcon;
}

const preguntasFrecuentes: PreguntasFrecuentes[] = [
  {
    id: 1,
    pregunta: "¿Quiénes pueden estudiar en la academia?",
    respuesta:
      "Cualquier persona apasionada por la belleza, sin experiencia previa.",
    icono: Users,
  },
  {
    id: 2,
    pregunta: "¿Los cursos incluyen materiales?",
    respuesta:
      "Sí, todos nuestros cursos incluyen materiales y productos.",
    icono: BookOpen,
  },
  {
    id: 3,
    pregunta: "¿Recibo certificado al finalizar?",
    respuesta:
      "Sí, obtendrá un certificado avalado por nuestra institución.",
    icono: GraduationCap,
  },
  {
    id: 4,
    pregunta: "¿Las clases son presenciales u online?",
    respuesta:
      "Contamos con modalidad presencial, online y semipresencial.",
    icono: Monitor,
  },
  {
    id: 5,
    pregunta: "¿Puedo pagar en cuotas?",
    respuesta:
      "Sí, ofrecemos diferentes métodos de pago y cuotas sin interés.",
    icono: CreditCard,
  },
  {
    id: 6,
    pregunta: "¿Dónde están ubicados?",
    respuesta:
      "Estamos en el corazón de la ciudad, con fácil acceso y estacionamiento.",
    icono: MapPin,
  },
];

function PreguntasFrecuentes() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="preguntas-frecuentes-heading"
      className="relative overflow-hidden bg-[#080808] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Fondo decorativo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Encabezado */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-sm">
            FAQ
          </p>

          <h2
            id="preguntas-frecuentes-heading"
            className="mt-4 font-serif text-4xl font-bold leading-tight text-[#f8f3ea] sm:text-5xl lg:text-6xl"
          >
            Preguntas Frecuentes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            Todo lo que necesitas saber sobre nuestros cursos.
          </p>

          <div
            className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="h-3 w-3 rotate-45 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
        </header>

        {/* Tarjetas */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {preguntasFrecuentes.map((item) => {
            const Icono = item.icono;

            return (
              <article
                key={item.id}
                className="group rounded-[24px] border border-amber-500/15 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#090909] p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_24px_60px_rgba(212,175,55,0.10)] sm:p-7"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/35 bg-black/40 text-amber-400 transition duration-300 group-hover:border-amber-400/60 group-hover:bg-amber-500/5">
                  <Icono className="h-8 w-8" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-xl font-bold leading-snug text-white sm:text-2xl">
                  {item.pregunta}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
                  {item.respuesta}
                </p>

                <div
                  className="mx-auto mt-6 h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PreguntasFrecuentes;