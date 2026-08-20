import { useProgresoQuery } from "@/features/Progreso/Hook/ProgresoHook";
import { QueryState } from "@/components/common/QueryState";
import { Check, Circle } from "lucide-react";

interface ProgresoModuloProps {
    moduloId: string;
}

export function ProgresoModulo({ moduloId }: ProgresoModuloProps) {
    const { data, isLoading, isError, error } = useProgresoQuery(moduloId);

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[80px]"
        >
            {data && (
                <div className="space-y-3">
                    {/* Mini pasos de progreso */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(data.leccionesTotales, 10) }).map((_, i) => {
                            const isCompleted = i < data.leccionesCompletadas;
                            return (
                                <div
                                    key={i}
                                    className={`flex-1 h-1 rounded-full transition-all ${isCompleted ? "bg-primary" : "bg-muted"
                                        }`}
                                />
                            );
                        })}
                        {data.leccionesTotales > 10 && (
                            <span className="text-[10px] text-muted-foreground ml-1">
                                +{data.leccionesTotales - 10}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-emerald-500" />
                                {data.leccionesCompletadas}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                            <span className="flex items-center gap-1">
                                <Circle className="h-3 w-3" />
                                {data.leccionesPendientes}
                            </span>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                            {data.porcentaje}%
                        </span>
                    </div>
                </div>
            )}
        </QueryState>
    );
}