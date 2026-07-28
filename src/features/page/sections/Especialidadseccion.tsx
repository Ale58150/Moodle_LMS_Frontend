import type { LucideIcon } from "lucide-react";
import {
  Award,
  Play,
  Sparkles,
  Square,
  Video,
  WandSparkles,
} from "lucide-react";

type Especialidad = {
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
};

const especialidades: Especialidad[] = [
  {
    titulo: "Maquillaje Profesional",
    descripcion:
      "Social, novias, editorial y caracterización con técnica de pasarela.",
    icono: WandSparkles,
  },
  {
    titulo: "Cosmetología Integral",
    descripcion:
      "Faciales, limpieza profunda, aparatología y protocolos de piel.",
    icono: Sparkles,
  },
  {
    titulo: "Uñas & Nail Art",
    descripcion:
      "Acrílico, gel, esculpido y diseño artístico avanzado.",
    icono: Award,
  },
  {
    titulo: "Cosmiatría",
    descripcion:
      "Tratamientos corporales, radiofrecuencia y cuidado avanzado.",
    icono: Square,
  },
  {
    titulo: "Peinados & Colorimetría",
    descripcion:
      "Recogidos, ondas, balayage y teoría del color aplicada.",
    icono: Video,
  },
  {
    titulo: "Micropigmentación",
    descripcion:
      "Cejas, labios y delineado con técnicas semipermanentes.",
    icono: Play,
  },
];

const Especialidadseccion = () => {
  return (
    <section className="min-h-screen w-full border-t border-[#d4af37]/15 bg-[#090908] px-5 py-10 text-white md:px-8">
      <div className="mx-auto w-full max-w-[1450px]">
        {/* Encabezado */}
        <header className="mb-12 text-center md:mb-16">
          <span className="mb-2 block text-xs font-semibold tracking-[0.3em] text-[#d4af37] md:text-sm">
            LO QUE PUEDES ESTUDIAR
          </span>

          <h1 className="font-serif text-4xl font-bold leading-tight text-[#f8f3e9] md:text-6xl">
            Especialidades
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#c8ba91] md:text-xl">
            Programas diseñados para el mundo real, con salida laboral
            inmediata.
          </p>
        </header>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {especialidades.map((especialidad) => {
            const Icono = especialidad.icono;

            return (
              <article
                key={especialidad.titulo}
                className="group min-h-[265px] rounded-[22px] border border-[#d4af37]/20 bg-[#161510] px-8 py-9 transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#302713] text-[#e8c64e] transition duration-300 group-hover:bg-[#3b3018]">
                  <Icono size={23} strokeWidth={1.7} />
                </div>

                <h2 className="mb-3 font-serif text-2xl font-bold leading-tight text-[#fff9eb]">
                  {especialidad.titulo}
                </h2>

                <p className="max-w-sm text-base leading-7 text-[#c5b58c] md:text-lg">
                  {especialidad.descripcion}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Especialidadseccion;
