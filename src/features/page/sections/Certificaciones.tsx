import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock3,
} from "lucide-react";

interface Certificacion {
  id: number;
  tipo: string;
  titulo: string;
  docente: string;
  area: string;
  duracion: string;
  lecciones: number;
  descripcion: string;
  imagen: string;
  posicionImagen: string;
}

const certificaciones: Certificacion[] = [
  {
    id: 1,
    tipo: "Certificación",
    titulo: "Maquillaje Profesional",
    docente: "Valeria Quispe",
    area: "Maquillaje",
    duracion: "120 horas",
    lecciones: 24,
    descripcion:
      "Domina las técnicas de maquillaje social, novias y editorial. Aprende colorimetría, visagismo y acabados profesionales.",
    imagen: "/certificaciones/maquillaje-profesional.jpg",
    posicionImagen: "center 25%",
  },
  {
    id: 2,
    tipo: "Diplomado",
    titulo: "Cosmetología Integral",
    docente: "Gabriela Mamani",
    area: "Cosmetología",
    duracion: "160 horas",
    lecciones: 30,
    descripcion:
      "Aprende diagnóstico de piel, limpieza profunda, tratamientos faciales y protocolos cosméticos integrales.",
    imagen: "/certificaciones/cosmetologia-integral.jpg",
    posicionImagen: "center 25%",
  },
  {
    id: 3,
    tipo: "Curso corto",
    titulo: "Nail Art Avanzado",
    docente: "Daniela Rocha",
    area: "Uñas",
    duracion: "48 horas",
    lecciones: 14,
    descripcion:
      "Capacítate en estructura, esmaltado, decoración, tendencias y diseño artístico avanzado para uñas.",
    imagen: "/certificaciones/nail-art-avanzado.jpg",
    posicionImagen: "center 25%",
  },
  {
    id: 4,
    tipo: "Certificación",
    titulo: "Brow Design Profesional",
    docente: "Andrea Flores",
    area: "Cejas",
    duracion: "40 horas",
    lecciones: 12,
    descripcion:
      "Especialízate en visagismo, diseño de cejas, perfilado y técnicas modernas para resultados profesionales.",
    imagen: "/certificaciones/brow-design-profesional.jpg",
    posicionImagen: "center 25%",
  },
];

function Certificaciones() {
  const [abierta, setAbierta] = useState<number>(1);

  const alternar = (id: number) => {
    setAbierta((actual) => (actual === id ? 0 : id));
  };

  return (
    <section
      id="certificaciones"
      aria-labelledby="certificaciones-heading"
      className="bg-[#090909] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 text-center sm:mb-12 lg:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-sm">
            Certificaciones destacadas
          </p>

          <h2
            id="certificaciones-heading"
            className="mt-3 font-serif text-4xl font-bold leading-tight text-[#f7f1e8] sm:text-5xl lg:text-6xl"
          >
            Empieza tu camino
          </h2>
        </header>

        <div className="space-y-4">
          {certificaciones.map((certificacion, index) => {
            const estaAbierta = abierta === certificacion.id;

            return (
              <article
                key={certificacion.id}
                className="overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0f0f0f] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition duration-300"
              >
                <button
                  type="button"
                  onClick={() => alternar(certificacion.id)}
                  aria-expanded={estaAbierta}
                  aria-controls={`certificacion-panel-${certificacion.id}`}
                  className="flex w-full flex-col gap-4 px-4 py-4 text-left transition hover:bg-white/[0.02] sm:px-5 lg:px-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                      {/* Número */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/25 bg-[#121212] text-xl font-bold text-amber-400 sm:h-14 sm:w-14 sm:text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Imagen */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-amber-500/20 bg-neutral-800 sm:h-20 sm:w-20">
                        <img
                          src={certificacion.imagen}
                          alt={certificacion.titulo}
                          loading="lazy"
                          style={{ objectPosition: certificacion.posicionImagen }}
                          onError={(evento) => {
                            evento.currentTarget.style.display = "none";
                          }}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Títulos */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl font-bold leading-tight text-[#f8f3ea] sm:text-2xl">
                          {certificacion.titulo}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-amber-400 sm:text-base">
                          {certificacion.tipo}
                        </p>

                        {estaAbierta && (
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
                            {certificacion.descripcion}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Datos y flecha */}
                    <div className="flex flex-col gap-3 lg:min-w-[260px] lg:items-end">
                      <div className="grid grid-cols-1 gap-2 text-sm text-neutral-200 sm:grid-cols-2 lg:grid-cols-1">
                        <span className="flex items-center gap-2">
                          <Clock3
                            className="h-4 w-4 shrink-0 text-amber-400"
                            aria-hidden="true"
                          />
                          {certificacion.duracion}
                        </span>

                        <span className="flex items-center gap-2">
                          <BookOpen
                            className="h-4 w-4 shrink-0 text-amber-400"
                            aria-hidden="true"
                          />
                          {certificacion.lecciones} lecciones
                        </span>
                      </div>

                      <div className="flex lg:justify-end">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/40 bg-[#121212] text-amber-400 transition duration-300">
                          {estaAbierta ? (
                            <ChevronUp className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                <div
                  id={`certificacion-panel-${certificacion.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    estaAbierta
                      ? "grid-rows-[1fr] border-t border-amber-500/10"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-5 pt-4 sm:px-5 lg:px-6">
                      <div className="flex flex-col gap-2 text-sm text-neutral-400 sm:text-base">
                        <p>
                          <span className="font-medium text-white">Docente:</span>{" "}
                          {certificacion.docente}
                        </p>

                        <p>
                          <span className="font-medium text-white">Área:</span>{" "}
                          {certificacion.area}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Certificaciones;