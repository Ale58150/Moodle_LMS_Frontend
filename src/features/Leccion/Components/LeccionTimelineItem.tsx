import { Check, Lock } from "lucide-react";
import { LeccionProgresoType } from "../Schema/LeccionSchema";

interface LeccionTimelineItemProps {
    leccion: LeccionProgresoType;
    numero: number;
    esUltima: boolean;
    esActual: boolean;
    onClick: (leccion: LeccionProgresoType) => void;
}

export function LeccionTimelineItem({ leccion, numero, esUltima, esActual, onClick }: LeccionTimelineItemProps) {
    const puedeAbrir = !leccion.bloqueada;

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div
                    className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                        leccion.completada
                            ? "border-primary bg-primary text-primary-foreground"
                            : leccion.bloqueada
                                ? "border-border bg-muted text-muted-foreground"
                                : "border-primary bg-background text-primary",
                    ].join(" ")}
                >
                    {leccion.completada ? (
                        <Check className="h-4 w-4" />
                    ) : leccion.bloqueada ? (
                        <Lock className="h-3.5 w-3.5" />
                    ) : (
                        numero
                    )}
                </div>

                {!esUltima && (
                    <div className={["mt-1 w-0.5 flex-1", leccion.completada ? "bg-primary" : "bg-border"].join(" ")} />
                )}
            </div>

            <div className="min-w-0 flex-1 pb-6">
                <button
                    type="button"
                    onClick={() => puedeAbrir && onClick(leccion)}
                    disabled={!puedeAbrir}
                    className={[
                        "flex w-full items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 text-left transition-colors",
                        puedeAbrir ? "cursor-pointer hover:border-primary/40 hover:bg-muted/20" : "cursor-not-allowed opacity-60",
                        esActual && "border-primary/50 bg-primary/5",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{leccion.nombre}</p>

                        {leccion.bloqueada && (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {leccion.motivoBloqueo === "no_inscrito"
                                    ? "Necesitas estar inscrito en este módulo"
                                    : "Completa la lección anterior para desbloquear"}
                            </p>
                        )}

                        {!leccion.bloqueada && !leccion.completada && (
                            <p className="mt-0.5 text-xs text-primary">Continuar aquí</p>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
}