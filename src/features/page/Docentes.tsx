import { useState } from "react";

interface Docente {
  id: number;
  nombre: string;
  especialidad: string;
  descripcion: string;
  imagen: string;
  posicionImagen: string;
}

const docentes: Docente[] = [
  {
    id: 1,
    nombre: "Valeria Quispe",
    especialidad: "Maquillaje Profesional",
    descripcion:
      "Especialista en maquillaje social, maquillaje para novias, caracterización y técnicas profesionales de pasarela.",
    imagen: "/docentes/valeria-quispe.jpg",
    posicionImagen: "center 20%",
  },
  {
    id: 2,
    nombre: "Gabriela Mamani",
    especialidad: "Cosmetología",
    descripcion:
      "Especialista en diagnóstico de la piel, tratamientos faciales, limpieza profunda y protocolos cosméticos.",
    imagen: "/docentes/gabriela-mamani.jpg",
    posicionImagen: "center 20%",
  },
  {
    id: 3,
    nombre: "Daniela Rocha",
    especialidad: "Uñas y Nail Art",
    descripcion:
      "Especialista en técnicas de uñas, estructura, diseño artístico y Nail Art avanzado.",
    imagen: "/docentes/daniela-rocha.jpg",
    posicionImagen: "center 20%",
  },
  {
    id: 4,
    nombre: "Andrea Flores",
    especialidad: "Cosmiatría",
    descripcion:
      "Especialista en tratamientos estéticos faciales, corporales y cuidado avanzado de la piel.",
    imagen: "/docentes/andrea-flores.jpg",
    posicionImagen: "center 20%",
  },
];

function obtenerIniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0))
    .join("")
    .toUpperCase();
}

interface DocenteCardProps {
  docente: Docente;
  abierta: boolean;
  duplicada?: boolean;
  onAlternar: (docenteId: number) => void;
}

function DocenteCard({
  docente,
  abierta,
  duplicada = false,
  onAlternar,
}: DocenteCardProps) {
  const manejarClick = (
    evento: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onAlternar(docente.id);

    window.setTimeout(() => {
      evento.currentTarget.blur();
    }, 100);
  };

  return (
    <article
      aria-hidden={duplicada || undefined}
      className="w-[84vw] max-w-[320px] shrink-0 sm:w-[300px] lg:w-[320px]"
    >
      <button
        type="button"
        tabIndex={duplicada ? -1 : 0}
        aria-expanded={abierta}
        aria-label={
          abierta
            ? `Ocultar información de ${docente.nombre}`
            : `Conocer a ${docente.nombre}`
        }
        onClick={manejarClick}
        className="docente-card group relative block h-[440px] w-full cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 text-left shadow-xl shadow-black/40 outline-none transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 focus-visible:ring-4 focus-visible:ring-amber-400"
      >
        {/* Fondo de respaldo */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500 via-neutral-800 to-black">
          <span className="text-6xl font-bold text-white/70">
            {obtenerIniciales(docente.nombre)}
          </span>
        </div>

        {/* Fotografía */}
        <img
          src={docente.imagen}
          alt={`Docente ${docente.nombre}`}
          loading="lazy"
          style={{
            objectPosition: docente.posicionImagen,
          }}
          onError={(evento) => {
            evento.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Oscurecimiento */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"
          aria-hidden="true"
        />

        {/* Información */}
        <div
          data-open={abierta}
          className="docente-info absolute inset-x-0 bottom-0 z-20 min-h-[245px] bg-gradient-to-t from-black via-black/95 to-black/75 px-5 pb-7 pt-6 text-white backdrop-blur-sm sm:px-6"
        >
          <h3 className="text-xl font-bold leading-tight sm:text-2xl">
            {docente.nombre}
          </h3>

          <p className="mt-2 text-sm font-semibold text-amber-400 sm:text-base">
            {docente.especialidad}
          </p>

          <div className="docente-descripcion">
            <p className="mt-6 text-sm leading-7 text-neutral-300 sm:text-base">
              {docente.descripcion}
            </p>

            <p className="mt-5 text-xs text-neutral-500 sm:hidden">
              Toca nuevamente para cerrar
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}

function Docentes() {
  const [docenteAbierto, setDocenteAbierto] = useState<number | null>(
    null,
  );

  const alternarDocente = (docenteId: number) => {
    setDocenteAbierto((idActual) =>
      idActual === docenteId ? null : docenteId,
    );
  };

  const carruselPausado = docenteAbierto !== null;

  return (
    <>
      <style>
        {`
          @keyframes mover-docentes-derecha {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0);
            }
          }

          .docentes-track {
            display: flex;
            width: max-content;
            animation: mover-docentes-derecha 30s linear infinite;
            animation-play-state: running;
            will-change: transform;
          }

          /*
           * Pausa controlada por React:
           * primer toque abre y pausa;
           * segundo toque cierra y continúa.
           */
          .docentes-track[data-paused="true"] {
            animation-play-state: paused;
          }

          /*
           * En computadora también se pausa al pasar el mouse.
           */
          @media (hover: hover) and (pointer: fine) {
            .docentes-slider:hover .docentes-track {
              animation-play-state: paused;
            }
          }

          .docente-info {
            transform: translateY(calc(100% - 105px));
            transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .docente-info[data-open="true"] {
            transform: translateY(0);
          }

          .docente-descripcion {
            opacity: 0;
            transform: translateY(18px);
            transition:
              opacity 300ms ease 100ms,
              transform 350ms ease 100ms;
          }

          .docente-info[data-open="true"] .docente-descripcion {
            opacity: 1;
            transform: translateY(0);
          }

          @media (hover: hover) and (pointer: fine) {
            .docente-card:hover .docente-info {
              transform: translateY(0);
            }

            .docente-card:hover .docente-descripcion {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            .docentes-track {
              animation-duration: 22s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .docentes-track {
              animation: none;
              transform: none;
            }

            .docente-card,
            .docente-card img,
            .docente-info,
            .docente-descripcion {
              transition: none;
            }
          }
        `}
      </style>

      <section
        id="docentes"
        aria-labelledby="docentes-heading"
        className="overflow-hidden bg-neutral-950 py-16 sm:py-20 lg:py-24"
      >
        <header className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 sm:text-sm">
            Nuestro equipo
          </p>

          <h2
            id="docentes-heading"
            className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Docentes expertos
          </h2>
        </header>

        <div className="docentes-slider relative mt-12 overflow-hidden">
          <div
            className="docentes-track"
            data-paused={carruselPausado}
          >
            {/* Primer grupo */}
            <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">
              {docentes.map((docente) => (
                <DocenteCard
                  key={docente.id}
                  docente={docente}
                  abierta={docenteAbierto === docente.id}
                  onAlternar={alternarDocente}
                />
              ))}
            </div>

            {/* Copia necesaria para el movimiento continuo */}
            <div
              className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6"
              aria-hidden="true"
            >
              {docentes.map((docente) => (
                <DocenteCard
                  key={`duplicada-${docente.id}`}
                  docente={docente}
                  abierta={docenteAbierto === docente.id}
                  duplicada
                  onAlternar={alternarDocente}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 px-4 text-center text-xs text-neutral-500 sm:text-sm">
          Toca una tarjeta para detenerla y conocer al docente. Toca
          nuevamente para continuar.
        </p>
      </section>
    </>
  );
}

export default Docentes;