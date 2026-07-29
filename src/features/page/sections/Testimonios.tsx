import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

interface Testimonio {
  id: number;
  nombre: string;
  curso: string;
  frase: string;
  imagen: string;
  posicionImagen: string;
}

const testimonios: Testimonio[] = [
  {
    id: 1,
    nombre: "Michelle Barrios",
    curso: "Curso de Cosmiatría",
    frase:
      "Entré sin experiencia alguna y hoy tengo mi propio centro estético. La academia cambió mi vida completamente.",
    imagen: "/testimonios/michelle-barrios.jpg",
    posicionImagen: "center 20%",
  },
  {
    id: 2,
    nombre: "Fernanda Gómez",
    curso: "Curso de Uñas y Nail Art",
    frase:
      "Aprendí técnicas que superaron mis expectativas. Las clases fueron prácticas, claras y muy inspiradoras.",
    imagen: "/testimonios/fernanda-gomez.jpg",
    posicionImagen: "center 20%",
  },
  {
    id: 3,
    nombre: "Carolina Ruiz",
    curso: "Curso de Maquillaje Profesional",
    frase:
      "Gracias a la academia hoy trabajo en lo que amo. Me dieron confianza, formación y nuevas oportunidades.",
    imagen: "/testimonios/carolina-ruiz.jpg",
    posicionImagen: "center 20%",
  },
];

function Testimonios() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const totalTestimonios = testimonios.length;
  const testimonioActivo = testimonios[indiceActual];

  const mostrarAnterior = () => {
    setIndiceActual(
      (indiceActual - 1 + totalTestimonios) % totalTestimonios,
    );
  };

  const mostrarSiguiente = () => {
    setIndiceActual(
      (indiceActual + 1) % totalTestimonios,
    );
  };

  const seleccionarTestimonio = (indice: number) => {
    setIndiceActual(indice);
  };

  useEffect(() => {
    if (pausado) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setIndiceActual((indice) => (indice + 1) % totalTestimonios);
    }, 6000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [pausado, totalTestimonios]);

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      className="relative overflow-hidden bg-[#080808] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Fondo decorativo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-amber-500/5 blur-3xl" />

        {/* Ondas doradas inferiores */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 220"
            className="h-24 w-full opacity-60 sm:h-28 lg:h-36"
            preserveAspectRatio="none"
          >
            <path
              d="M0,170 C180,120 260,200 420,165 C610,122 700,60 890,118 C1030,160 1160,208 1440,120"
              fill="none"
              stroke="rgba(212,175,55,0.35)"
              strokeWidth="2"
            />

            <path
              d="M0,195 C190,145 300,225 500,180 C670,142 780,92 965,146 C1110,188 1240,224 1440,152"
              fill="none"
              stroke="rgba(212,175,55,0.18)"
              strokeWidth="1.5"
            />

            <path
              d="M0,210 C220,170 350,230 560,190 C720,160 850,125 1030,170 C1180,205 1310,220 1440,185"
              fill="none"
              stroke="rgba(212,175,55,0.1)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Encabezado */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-sm">
            Testimonios
          </p>

          <h2
            id="testimonios-heading"
            className="mt-4 font-serif text-4xl font-bold leading-tight text-[#f8f3ea] sm:text-5xl lg:text-6xl"
          >
            Palabras que
            <br className="hidden sm:block" />
            nos motivan
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            Nada nos hace más felices que ver a nuestras alumnas cumplir
            sus sueños.
          </p>

          <div
            className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/60" />

            <span className="h-2 w-2 rotate-45 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
        </header>

        {/* Carrusel */}
        <div
          className="relative mx-auto mt-12 max-w-4xl"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
        >
          {/* Flecha izquierda */}
          <button
            type="button"
            onClick={mostrarAnterior}
            aria-label="Ver testimonio anterior"
            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/45 bg-black/70 text-amber-300 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-amber-400 hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 sm:left-2 sm:h-11 sm:w-11 lg:-left-8"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Flecha derecha */}
          <button
            type="button"
            onClick={mostrarSiguiente}
            aria-label="Ver siguiente testimonio"
            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/45 bg-black/70 text-amber-300 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-amber-400 hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 sm:right-2 sm:h-11 sm:w-11 lg:-right-8"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Tarjeta principal */}
          <article className="relative overflow-hidden rounded-[28px] border border-amber-500/20 bg-gradient-to-br from-[#100e0b] via-[#0b0b0b] to-[#080808] px-8 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:px-12 sm:py-12 lg:px-20 lg:py-16">
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-amber-500/5 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-3xl">
              {/* Comillas decorativas */}
              <Quote
                className="mx-auto h-8 w-8 fill-amber-400/20 text-amber-400 sm:h-10 sm:w-10"
                aria-hidden="true"
              />

              <blockquote className="mt-6 font-serif text-xl italic leading-relaxed text-[#f6efe2] sm:text-2xl sm:leading-relaxed lg:text-3xl">
                “{testimonioActivo.frase}”
              </blockquote>

              <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

              {/* Alumna */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400/70 bg-gradient-to-br from-amber-700 via-neutral-800 to-black shadow-[0_0_20px_rgba(212,175,55,0.18)] sm:h-18 sm:w-18">
                  <span className="absolute text-lg font-bold text-white/70">
                    {testimonioActivo.nombre
                      .split(" ")
                      .slice(0, 2)
                      .map((palabra) => palabra.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </span>

                  <img
                    src={testimonioActivo.imagen}
                    alt={testimonioActivo.nombre}
                    loading="lazy"
                    style={{
                      objectPosition:
                        testimonioActivo.posicionImagen,
                    }}
                    onError={(evento) => {
                      evento.currentTarget.style.display = "none";
                    }}
                    className="relative z-10 h-full w-full object-cover"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-base font-bold text-amber-400 sm:text-lg">
                    {testimonioActivo.nombre}
                  </p>

                  <p className="mt-1 text-sm text-neutral-400 sm:text-base">
                    {testimonioActivo.curso}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Indicadores */}
          <div
            className="mt-8 flex justify-center gap-3"
            aria-label="Seleccionar testimonio"
          >
            {testimonios.map((testimonio, indice) => (
              <button
                key={testimonio.id}
                type="button"
                onClick={() => seleccionarTestimonio(indice)}
                aria-label={`Ver testimonio de ${testimonio.nombre}`}
                aria-current={
                  indiceActual === indice ? "true" : undefined
                }
                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  indiceActual === indice
                    ? "h-3 w-8 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                    : "h-3 w-3 bg-amber-400/35 hover:bg-amber-400/60"
                }`}
              />
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-neutral-600 sm:text-sm">
            Usa las flechas o los indicadores para conocer más historias.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonios;