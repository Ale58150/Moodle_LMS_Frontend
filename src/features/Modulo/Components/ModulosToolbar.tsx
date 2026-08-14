"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ModulosToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;

    incluirNoPublicados?: boolean;
    onIncluirNoPublicadosChange?: (value: boolean) => void;
}

export function ModulosToolbar({
    search,
    onSearchChange,
    onClear,
    incluirNoPublicados,
    onIncluirNoPublicadosChange,
}: ModulosToolbarProps) {
    const hayFiltros = search.trim() !== "";
    const mostrarSwitchAdmin = onIncluirNoPublicadosChange !== undefined;

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar módulos..."
                    className="h-10 pl-9"
                />
            </div>

            {mostrarSwitchAdmin && (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        checked={incluirNoPublicados}
                        onChange={(event) =>
                            onIncluirNoPublicadosChange?.(event.target.checked)
                        }
                        className="h-4 w-4 rounded border-border"
                    />
                    Ver no publicados
                </label>
            )}

            {hayFiltros && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onClear}
                    className="shrink-0"
                    title="Limpiar filtros"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}