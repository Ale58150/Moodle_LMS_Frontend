import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetModulo } from "@/features/Modulo/Hook/ModuloHook";

export default function ModuloDetallePage() {
    const { id: cursoId, moduloId } = useParams<{ id: string; moduloId: string }>();
    const navigate = useNavigate();

    const { data: modulo, isLoading, isError } = useGetModulo(moduloId!);

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !modulo) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-destructive">No se pudo cargar el módulo.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/cursos/${cursoId}/modulos`)}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a módulos
            </Button>

            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{modulo.nombre}</h1>

                {modulo.otorgaCertificacion && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Certifica
                    </span>
                )}
            </div>

            {modulo.fraseMotivacional && (
                <p className="italic text-muted-foreground">{modulo.fraseMotivacional}</p>
            )}

            {modulo.descripcion && (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{modulo.descripcion}</p>
            )}

            <div className="rounded-xl border bg-muted/20 p-6 text-sm text-muted-foreground">
                Lecciones — próximamente. ({modulo._count.lecciones} lecciones registradas)
            </div>
        </div>
    );
}