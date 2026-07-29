import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Monitor,
  Sparkles,
} from "lucide-react";

function Especialidadseccion() {
  return (
    <section
      id="especialidades"
      aria-labelledby="especialidades-heading"
      className="relative overflow-hidden bg-[#090909] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Decoración de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Encabezado */}
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-sm">
            Formación especializada
          </p>

          <h2
            id="especialidades-heading"
            className="mt-3 font-serif text-4xl font-bold leading-tight text-[#f7f1e8] sm:text-5xl lg:text-6xl"
          >
            Nuestras Especialidades
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            Conoce nuestra oferta de especializaciones profesionales en
            belleza, estética facial, corporal y técnicas avanzadas.
          </p>

          <div
            className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/60" />

            <span className="h-2 w-2 rotate-45 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
        </header>

        {/* Única tarjeta */}
        <article className="mx-auto max-w-5xl">
          <a
            href="/especialidades"
            aria-label="Ingresar a todas nuestras especialidades"
            className="group relative block min-h-[430px] overflow-hidden rounded-[30px] border border-amber-500/40 bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.55)] outline-none transition duration-500 hover:-translate-y-2 hover:border-amber-400/80 hover:shadow-[0_30px_80px_rgba(212,175,55,0.18)] focus-visible:ring-4 focus-visible:ring-amber-400/60 sm:min-h-[460px]"
          >
            {/* Fondo principal */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9a5700] via-[#21170d] to-black" />

            {/* Brillo decorativo */}
            <div
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl transition-transform duration-700 group-hover:-translate-x-10 group-hover:translate-y-10"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:translate-x-10 group-hover:-translate-y-8"
              aria-hidden="true"
            />

            <div
              className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/25"
              aria-hidden="true"
            />

            {/* Contenido */}
            <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6 sm:min-h-[460px] sm:p-9 lg:p-12">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/50 bg-black/60 text-amber-400 shadow-[0_0_28px_rgba(212,175,55,0.16)] backdrop-blur-md sm:h-16 sm:w-16">
                  <GraduationCap
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <span className="rounded-full border border-amber-400/40 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-300 backdrop-blur-md sm:text-sm">
                  Inscripciones abiertas
                </span>
              </div>

              <div className="mt-10 max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400 sm:text-sm">
                  Formación profesional
                </p>

                <h3 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Nuestras Especialidades
                </h3>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base lg:text-lg">
                  Explora nuestros programas de Postoperatorio,
                  Electroestética, Cejas y Pestañas, Estética Facial,
                  Estética Corporal, Microneedling, Química Cosmética y
                  muchas especialidades más.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-neutral-200 sm:text-sm">
                    <BookOpen
                      className="h-4 w-4 text-amber-400"
                      aria-hidden="true"
                    />
                    12 especialidades
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-neutral-200 sm:text-sm">
                    <Monitor
                      className="h-4 w-4 text-amber-400"
                      aria-hidden="true"
                    />
                    Online y presencial
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 sm:text-sm">
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Cupos limitados
                  </span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-sm font-semibold text-white sm:text-base">
                  Conocer todas las especialidades
                </span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/50 bg-black/60 text-amber-400 transition duration-300 group-hover:translate-x-1 group-hover:border-amber-300 group-hover:bg-amber-400 group-hover:text-black">
                  <ArrowRight
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </a>
        </article>
      </div>
    </section>
  );
}

export default Especialidadseccion;