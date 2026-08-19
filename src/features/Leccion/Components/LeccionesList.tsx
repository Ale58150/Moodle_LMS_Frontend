import { Loader2 } from "lucide-react";
import { LeccionItem } from "./LeccionCard";
import { LeccionListItemType } from "../Schema/LeccionSchema";
import { useGetLecciones } from "../Hook/LeccionHook";

interface LeccionesListProps {
    moduloId: string;
    search: string;
    onEditar?: (leccion: LeccionListItemType) => void;
    onEliminar?: (leccion: LeccionListItemType) => void;
    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function LeccionesList({
    moduloId,
    search,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: LeccionesListProps) {
    const { data: lecciones, isLoading, isError } = useGetLecciones(moduloId, {
        nombre: search || undefined,
    });

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
                <p className="text-sm text-destructive">No se pudieron cargar las lecciones.</p>
            </div>
        );
    }

    if (!lecciones || lecciones.length === 0) {
        return (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
                <p className="text-sm text-muted-foreground">No hay lecciones que coincidan con tu búsqueda.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {lecciones.map((leccion) => (
                <LeccionItem
                    key={leccion.id}
                    leccion={leccion}
                    onEditar={onEditar}
                    onEliminar={onEliminar}
                    puedeEditar={puedeEditar}
                    puedeEliminar={puedeEliminar}
                />
            ))}
        </div>
    );
}