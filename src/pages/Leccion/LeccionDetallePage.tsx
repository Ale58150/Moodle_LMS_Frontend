import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LeccionVideoPlayer } from "@/features/Leccion/Components/LeccionVideoPlayer";
import { RecursoViewer } from "@/features/Leccion/Components/RecursoViewer";
import { LeccionCheckpointForm } from "@/features/Leccion/Components/LeccionCheckpointForm";
import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { useGetLeccion } from "@/features/Leccion/Hook/LeccionHook";

export default function LeccionDetallePage() {
    const { id: cursoId, moduloId, leccionId } = useParams<{
        id: string;
        moduloId: string;
        leccionId: string;
    }>();
    const navigate = useNavigate();

    const { data: leccion, isLoading, isError } = useGetLeccion(leccionId!);

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !leccion) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-destructive">No se pudo cargar la lección.</p>
            </div>
        );
    }

    const contenidoSeguro = leccion.contenidoHtml ? DOMPurify.sanitize(leccion.contenidoHtml) : null;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/cursos/${cursoId}/modulos/${moduloId}`)}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al módulo
            </Button>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1 space-y-6">
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{leccion.nombre}</h1>

                    {leccion.urlVideo && (
                        <LeccionVideoPlayer urlVideo={leccion.urlVideo} proveedorVideo={leccion.proveedorVideo} />
                    )}

                    {contenidoSeguro && (
                        <div
                            className="prose prose-sm max-w-none text-foreground sm:prose-base"
                            dangerouslySetInnerHTML={{ __html: contenidoSeguro }}
                        />
                    )}

                    {leccion.recursos.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Recursos</p>
                            <div className="space-y-3">
                                {leccion.recursos.map((recurso) => (
                                    <RecursoViewer key={recurso.id} recurso={recurso} />
                                ))}
                            </div>
                        </div>
                    )}

                    <LeccionCheckpointForm
                        leccionId={leccion.id}
                        onCompletada={() => {
                        }}
                    />
                </div>

                <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-80">
                    <LeccionesTimeline moduloId={moduloId!} />
                </aside>
            </div>
        </div>
    );
}