import { FileText, Video, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeccionListItemType } from "../Schema/LeccionSchema";

interface LeccionItemProps {
    leccion: LeccionListItemType;
    onVer?: (leccion: LeccionListItemType) => void;
    onEditar?: (leccion: LeccionListItemType) => void;
    onEliminar?: (leccion: LeccionListItemType) => void;
    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function LeccionItem({
    leccion,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: LeccionItemProps) {
    const mostrarAcciones = puedeEditar || puedeEliminar;
    const Icono = leccion.urlVideo ? Video : FileText;

    return (
        <article
            onClick={() => onVer?.(leccion)}
            className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:shadow-sm"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icono className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground">{leccion.nombre}</h3>

                    {leccion.esVistaPrevia && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            <Eye className="h-3 w-3" />
                            Vista previa
                        </span>
                    )}

                    {!leccion.estaPublicada && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            <EyeOff className="h-3 w-3" />
                            No publicada
                        </span>
                    )}
                </div>

                {leccion.descripcion && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{leccion.descripcion}</p>
                )}
            </div>

            {mostrarAcciones && (
                <div
                    className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    onClick={(event) => event.stopPropagation()}
                >
                    {puedeEditar && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => onEditar?.(leccion)} title="Editar lección">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}

                    {puedeEliminar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onEliminar?.(leccion)}
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Dar de baja lección"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
        </article>
    );
}