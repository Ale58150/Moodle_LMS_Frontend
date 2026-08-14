"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CursoItem } from "./CursoCard";
import { useCursos } from "../Hook/CursoHook";
import { CursoType } from "../Schema/CursoSchema";

interface CursosListProps {
    search: string;
    categoria: string;
    onEditar?: (curso: CursoType) => void;
}

export function CursosList({
    search,
    categoria,
    onEditar,
}: CursosListProps) {
    const page = 1;
    const limit = 10;

    const {
        data,
        isLoading,
        isError,
    } = useCursos(
        page,
        limit,
        search,
        categoria
    );

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
                <p className="text-sm text-destructive">
                    No se pudieron cargar los cursos.
                </p>
            </div>
        );
    }

    const cursos = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="space-y-5">

            {cursos.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                    {cursos.map((curso) => (
                        <CursoItem
                            key={curso.id}
                            curso={curso}
                            esAdmin
                            onEditar={onEditar}
                        />
                    ))}
                </div>
            ) : (
                <div className="
                    flex
                    min-h-[280px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    bg-muted/20
                ">
                    <p className="text-sm text-muted-foreground">
                        No existen cursos que coincidan con tu búsqueda.
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
                            variant="outline"
                            size="sm"
                            disabled={meta.page <= 1}
                        >
                            Anterior
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.page >= meta.totalPages}
                        >
                            Siguiente
                        </Button>

                    </div>

                </div>
            )}

        </div>
    );
}