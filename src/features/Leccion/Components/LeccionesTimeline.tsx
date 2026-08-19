// features/Leccion/Components/LeccionesTimeline.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { LeccionTimelineItem } from "./LeccionTimelineItem";
import { useGetLeccionesConProgreso } from "../Hook/LeccionHook";
import { LeccionProgresoType } from "../Schema/LeccionSchema";

interface LeccionesTimelineProps {
    moduloId: string;
}

export function LeccionesTimeline({ moduloId }: LeccionesTimelineProps) {
    const { id: cursoId, leccionId: leccionIdActual } = useParams<{ id: string; leccionId?: string }>();
    const navigate = useNavigate();

    const { data: lecciones, isLoading, isError } = useGetLeccionesConProgreso(moduloId);

    if (isLoading) {
        return (
            <div className="flex min-h-[200px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[200px] items-center justify-center">
                <p className="text-sm text-destructive">No se pudo cargar el progreso de las lecciones.</p>
            </div>
        );
    }

    if (!lecciones || lecciones.length === 0) {
        return (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
                <p className="text-sm text-muted-foreground">Este módulo todavía no tiene lecciones.</p>
            </div>
        );
    }

    const handleClick = (leccion: LeccionProgresoType) => {
        navigate(`/cursos/${cursoId}/modulos/${moduloId}/lecciones/${leccion.id}`);
    };

    return (
        <div className="flex flex-col">
            {lecciones.map((leccion, index) => (
                <LeccionTimelineItem
                    key={leccion.id}
                    leccion={leccion}
                    numero={index + 1}
                    esUltima={index === lecciones.length - 1}
                    esActual={leccion.id === leccionIdActual}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}