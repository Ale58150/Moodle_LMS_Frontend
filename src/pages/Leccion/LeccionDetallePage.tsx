import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LeccionVideoPlayer } from "@/features/Leccion/Components/LeccionVideoPlayer";
import { RecursoViewer } from "@/features/Leccion/Components/RecursoViewer";
import { LeccionCheckpointForm } from "@/features/Leccion/Components/LeccionCheckpointForm";
import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { LeccionBloqueadaDialog } from "@/features/Leccion/Components/LeccionBloqueadaDialog";
import { useGetLeccion, useGetLeccionesConProgreso } from "@/features/Leccion/Hook/LeccionHook";

export default function LeccionDetallePage() {
    const { id: cursoId, moduloId, leccionId } = useParams<{
        id: string;
        moduloId: string;
        leccionId: string;
    }>();
    const navigate = useNavigate();

    const { data: leccion, isLoading, isError } = useGetLeccion(leccionId!);

    const { data: leccionesProgreso } = useGetLeccionesConProgreso(moduloId!);

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

    // Bloqueada según el propio backend (GET /lecciones/:id ya lo resuelve
    // considerando inscripción + secuencialidad). No se renderiza nada más.
    if (leccion.bloqueada) {
        return (
            <LeccionBloqueadaDialog
                open
                motivo={leccion.motivoBloqueo}
                cursoId={cursoId!}
                moduloId={moduloId!}
            />
        );
    }

    const indexActual = leccionesProgreso?.findIndex((l) => l.id === leccionId) ?? -1;
    const estaCompletada = indexActual >= 0 ? leccionesProgreso![indexActual].completada : false;
    const siguienteLeccionId =
        indexActual >= 0 && indexActual < (leccionesProgreso?.length ?? 0) - 1
            ? leccionesProgreso![indexActual + 1].id
            : undefined;

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

            {/* Punto 2: sin lg:sticky -> el aside se desplaza junto con el
                contenido en vez de quedarse fijo mientras el texto scrollea. */}
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
                        cursoId={cursoId!}
                        moduloId={moduloId!}
                        estaCompletada={estaCompletada}
                        siguienteLeccionId={siguienteLeccionId}
                        onNavigateSiguiente={(id) => navigate(`/cursos/${cursoId}/modulos/${moduloId}/lecciones/${id}`)}
                    />
                </div>

                <aside className="w-full shrink-0 lg:w-80">
                    <LeccionesTimeline moduloId={moduloId!} />
                </aside>
            </div>
        </div>
    );
}