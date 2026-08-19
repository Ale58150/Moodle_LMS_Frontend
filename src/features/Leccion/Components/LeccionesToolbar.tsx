import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LeccionesToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

export function LeccionesToolbar({ search, onSearchChange, onClear }: LeccionesToolbarProps) {
    const hayFiltros = search.trim() !== "";

    return (
        <div className="flex items-center gap-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar lecciones..."
                    className="h-10 pl-9"
                />
            </div>

            {hayFiltros && (
                <Button type="button" variant="ghost" size="icon" onClick={onClear} title="Limpiar filtros">
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}