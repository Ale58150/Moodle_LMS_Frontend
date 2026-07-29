import {
  ArrowRight,
  Eye,
  Palette,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Curso {
  id: number;
  numero: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  posicionImagen: string;
  icono: LucideIcon;
  enlace: string;
}

const cursos: Curso[] = [
  {
    id: 1,
    numero: "01",
    titulo: "Cursos Faciales",
    descripcion:
      "Aprende protocolos profesionales para el diagnóstico, cuidado y tratamiento integral de la piel.",
    contenido:
      "Limpieza facial, dermaplaning, peelings, microneedling y electroestética facial.",
    imagen: "/cursos/cursos-faciales.jpg",
    posicionImagen: "center 35%",
    icono: Sparkles,
    enlace: "/cursos/faciales",
  },
  {
    id: 2,
    numero: "02",
    titulo: "Cursos Corporales",
    descripcion:
      "Domina procedimientos para el bienestar, cuidado y transformación estética del cuerpo.",
    contenido:
      "Maderoterapia, drenaje linfático, tratamientos reductores y electroestética corporal.",
    imagen: "/cursos/cursos-corporales.jpg",
    posicionImagen: "center 35%",
    icono: WandSparkles,
    enlace: "/cursos/corporales",
  },
  {
    id: 3,
    numero: "03",
    titulo: "Cursos de Maquillaje",
    descripcion:
      "Desarrolla técnicas profesionales para crear maquillajes sociales, artísticos y de alto impacto.",
    contenido:
      "Maquillaje social, novias, colorimetría, visagismo, editorial y maquillaje artístico.",
    imagen: "/cursos/cursos-maquillaje.jpg",
    posicionImagen: "center 25%",
    icono: Palette,
    enlace: "/cursos/maquillaje",
  },
  {
    id: 4,
    numero: "04",
    titulo: "Cursos de Cejas y Pestañas",
    descripcion:
      "Especialízate en técnicas para diseñar, definir y realzar profesionalmente la mirada.",
    contenido:
      "Diseño de cejas, laminado, lifting, extensiones y técnicas profesionales de pestañas.",
    imagen: "/cursos/cursos-cejas-pestanas.jpg",
    posicionImagen: "center 30%",
    icono: Eye,
    enlace: "/cursos/cejas-pestanas",
  },
];

interface TarjetaTextoProps {
  curso: Curso;
  compacta?: boolean;
}

function TarjetaTexto({
  curso,
  compacta = false,
}: TarjetaTextoProps) {
  const Icono = curso.icono;

  return (
    <article
      className={`group relative flex h-full flex-col justify-center overflow-hidden rounded-[22px] border border-amber-500/30 bg-gradient-to-br from-[#191711] via-[#11110f] to-[#090909] shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-[0_22px_55px_rgba(212,175,55,0.15)] ${
        compacta ? "min-h-[185px] p-3" : "min-h-[240px] p-6 sm:p-7 lg:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-amber-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`flex shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-black/50 text-amber-400 ${
              compacta ? "h-9 w-9" : "h-12 w-12"
            }`}
          >
            <Icono
              className={compacta ? "h-4 w-4" : "h-6 w-6"}
              aria-hidden="true"
            />
          </div>

          <span
            className={`font-serif font-bold text-amber-400/25 ${
              compacta ? "text-lg" : "text-3xl"
            }`}
          >
            {curso.numero}
          </span>
        </div>

        <h3
          className={`mt-3 font-serif font-bold leading-tight text-[#f8f3ea] ${
            compacta ? "text-base" : "text-2xl sm:text-3xl"
          }`}
        >
          {curso.titulo}
        </h3>

        <div
          className={`mt-2 bg-amber-400 ${
            compacta ? "h-[1px] w-8" : "h-0.5 w-10"
          }`}
          aria-hidden="true"
        />

        <p
          className={`mt-3 text-neutral-300 ${
            compacta ? "text-[11px] leading-5" : "text-sm leading-6 sm:text-base"
          }`}
        >
          {curso.descripcion}
        </p>

        <p
          className={`mt-2 text-neutral-500 ${
            compacta ? "text-[10px] leading-4" : "text-sm leading-6"
          }`}
        >
          {curso.contenido}
        </p>

        <a
          href={curso.enlace}
          className={`mt-4 inline-flex items-center gap-2 font-semibold text-amber-400 outline-none transition hover:text-amber-300 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-amber-400 ${
            compacta ? "text-[11px]" : "text-sm"
          }`}
        >
          Conocer cursos

          <ArrowRight
            className={`transition-transform duration-300 group-hover:translate-x-1 ${
              compacta ? "h-3.5 w-3.5" : "h-4 w-4"
            }`}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

interface TarjetaImagenProps {
  curso: Curso;
  compacta?: boolean;
}

function TarjetaImagen({
  curso,
  compacta = false,
}: TarjetaImagenProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[22px] border border-amber-500/35 bg-[#151515] shadow-[0_18px_45px_rgba(0,0,0,0.4)] transition duration-500 hover:-translate-y-1 hover:border-amber-400/75 hover:shadow-[0_22px_55px_rgba(212,175,55,0.15)] ${
        compacta ? "min-h-[185px]" : "min-h-[240px]"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-neutral-800 to-black" />

      <img
        src={curso.imagen}
        alt={curso.titulo}
        loading="lazy"
        style={{ objectPosition: curso.posicionImagen }}
        onError={(evento) => {
          evento.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"
        aria-hidden="true"
      />

      <div
        className={`absolute rounded-full border border-amber-400/40 bg-black/65 text-amber-300 backdrop-blur-md ${
          compacta
            ? "bottom-3 left-3 px-3 py-1 text-[11px]"
            : "bottom-4 left-4 px-4 py-2 text-xs font-semibold"
        }`}
      >
        {curso.titulo}
      </div>
    </article>
  );
}

function PuntoCamino({
  numero,
  ultimo,
}: {
  numero: string;
  ultimo: boolean;
}) {
  return (
    <div className="relative flex h-full min-h-[185px] items-center justify-center sm:min-h-[210px] lg:min-h-[240px]">
      {!ultimo && (
        <span
          className="absolute left-1/2 top-1/2 h-[calc(100%+28px)] -translate-x-1/2 border-l border-dashed border-amber-400/55 sm:h-[calc(100%+36px)] lg:h-[calc(100%+40px)]"
          aria-hidden="true"
        />
      )}

      <span className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400 bg-[#11100d] font-serif text-sm font-bold text-amber-300 shadow-[0_0_22px_rgba(251,191,36,0.28)] sm:h-12 sm:w-12 sm:text-lg lg:h-16 lg:w-16 lg:text-2xl">
        {numero}
      </span>
    </div>
  );
}

function Cursos() {
  return (
    <section
      id="cursos"
      aria-labelledby="cursos-heading"
      className="relative overflow-hidden bg-[#080808] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 sm:text-sm">
            Formación para tu futuro
          </p>

          <h2
            id="cursos-heading"
            className="mt-4 font-serif text-4xl font-bold leading-tight text-[#f8f3ea] sm:text-5xl lg:text-6xl"
          >
            Nuestros Cursos
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            Elige el área que más te apasiona y construye tu camino
            profesional con formación práctica y especializada.
          </p>

          <div
            className="mx-auto mt-6 flex max-w-sm items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="h-2 w-2 rotate-45 bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
        </header>

        {/* Camino zigzag */}
        <div className="space-y-7 sm:space-y-8 lg:space-y-10">
          {cursos.map((curso, indice) => {
            const imagenIzquierda = indice % 2 === 0;

            return (
              <div
                key={curso.id}
                className="relative grid grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)] sm:gap-3 lg:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] lg:gap-6"
              >
                {/* Lado izquierdo */}
                <div>
                  {imagenIzquierda ? (
                    <>
                      <div className="block lg:hidden">
                        <TarjetaImagen curso={curso} compacta />
                      </div>

                      <div className="hidden lg:block">
                        <TarjetaImagen curso={curso} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="block lg:hidden">
                        <TarjetaTexto curso={curso} compacta />
                      </div>

                      <div className="hidden lg:block">
                        <TarjetaTexto curso={curso} />
                      </div>
                    </>
                  )}
                </div>

                {/* Centro */}
                <div>
                  <PuntoCamino
                    numero={curso.numero}
                    ultimo={indice === cursos.length - 1}
                  />
                </div>

                {/* Lado derecho */}
                <div>
                  {imagenIzquierda ? (
                    <>
                      <div className="block lg:hidden">
                        <TarjetaTexto curso={curso} compacta />
                      </div>

                      <div className="hidden lg:block">
                        <TarjetaTexto curso={curso} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="block lg:hidden">
                        <TarjetaImagen curso={curso} compacta />
                      </div>

                      <div className="hidden lg:block">
                        <TarjetaImagen curso={curso} />
                      </div>
                    </>
                  )}
                </div>

                {/* Conectores horizontales */}
                <span
                  className="pointer-events-none absolute left-[calc(50%-22px)] top-1/2 h-px w-[22px] bg-gradient-to-r from-transparent to-amber-400/70 sm:left-[calc(50%-26px)] sm:w-[26px] lg:left-[calc(50%-45px)] lg:w-[45px]"
                  aria-hidden="true"
                />

                <span
                  className="pointer-events-none absolute right-[calc(50%-22px)] top-1/2 h-px w-[22px] bg-gradient-to-l from-transparent to-amber-400/70 sm:right-[calc(50%-26px)] sm:w-[26px] lg:right-[calc(50%-45px)] lg:w-[45px]"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-2xl border-t border-amber-500/20 pt-8 text-center">
          <p className="font-serif text-xl text-amber-300 sm:text-2xl">
            Aprende. Practica. Transforma tu futuro.
          </p>

          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Cada curso es un paso más hacia tu crecimiento profesional.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Cursos;