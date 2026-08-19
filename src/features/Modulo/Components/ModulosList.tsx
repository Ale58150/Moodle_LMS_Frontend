// features/Modulo/Components/ModulosList.tsx
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ModuloItem } from "./ModuloCard";
import { ModuloType } from "../Schema/ModuloSchema";
import { useGetModulosByCurso } from "../Hook/ModuloHook";

interface ModulosListProps {
    cursoId: string;
    search: string;

    onVer?: (modulo: ModuloType) => void;
    onEditar?: (modulo: ModuloType) => void;
    onEliminar?: (modulo: ModuloType) => void;

    puedeEditar?: boolean;
    puedeEliminar?: boolean;

    incluirNoPublicados?: boolean;
}

export function ModulosList({
    cursoId,
    search,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
    incluirNoPublicados = false,
}: ModulosListProps) {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError } = useGetModulosByCurso(cursoId, page, limit, {
        nombre: search || undefined,
        estaPublicado: incluirNoPublicados ? undefined : true,
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-destructive">No se pudieron cargar los módulos.</p>
            </div>
        );
    }

    const modulos = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="space-y-5">
            {modulos.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                    {modulos.map((modulo) => (
                        <ModuloItem
                            key={modulo.id}
                            modulo={modulo}
                            onVer={onVer}
                            puedeEditar={puedeEditar}
                            puedeEliminar={puedeEliminar}
                            onEditar={onEditar}
                            onEliminar={onEliminar}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[280px] items-center justify-center rounded-xl border bg-muted/20">
                    <p className="text-sm text-muted-foreground">
                        Este curso todavía no tiene módulos que coincidan con tu búsqueda.
                    </p>
                </div>
            )}

            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-5">
                    <p className="text-sm text-muted-foreground">
                        Página {meta.page} de {meta.totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={meta.page <= 1}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Anterior
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={meta.page >= meta.totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}