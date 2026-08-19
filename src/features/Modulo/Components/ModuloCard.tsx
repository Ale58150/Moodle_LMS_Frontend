// Components/ModuloCard.tsx
import {
    BadgeCheck,
    EyeOff,
    Pencil,
    Trash2,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { ModuloType } from "../Schema/ModuloSchema";

interface ModuloItemProps {
    modulo: ModuloType;

    onVer?: (modulo: ModuloType) => void;

    onEditar?: (modulo: ModuloType) => void;
    onEliminar?: (modulo: ModuloType) => void;

    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function ModuloItem({
    modulo,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: ModuloItemProps) {
    const mostrarAcciones = puedeEditar || puedeEliminar;

    return (
        <article
            onClick={() => onVer?.(modulo)}
            className="group flex w-full cursor-pointer items-center gap-5 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:shadow-sm"
        >
            <div className="h-[90px] w-[130px] shrink-0 overflow-hidden rounded-lg bg-muted">
                {modulo.rutaImagen ? (
                    <img
                        src={modulo.rutaImagen}
                        alt={modulo.nombre}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
                        {modulo.nombre}
                    </h3>

                    {modulo.otorgaCertificacion && (
                        <span
                            title="Otorga certificación"
                            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Certifica
                        </span>
                    )}

                    {!modulo.estaPublicado && (
                        <span
                            title="No publicado"
                            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                            <EyeOff className="h-3.5 w-3.5" />
                            No publicado
                        </span>
                    )}
                </div>

                {modulo.fraseMotivacional && (
                    <p className="mt-1 line-clamp-1 text-sm italic text-muted-foreground">
                        {modulo.fraseMotivacional}
                    </p>
                )}

                {modulo.descripcion && (
                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {modulo.descripcion}
                    </p>
                )}

                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                    Ver lecciones
                    <ChevronRight className="h-3.5 w-3.5" />
                </div>
            </div>

            {mostrarAcciones && (
                <div
                    className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    {puedeEditar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditar?.(modulo)}
                            title="Editar módulo"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}

                    {puedeEliminar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onEliminar?.(modulo)}
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Dar de baja módulo"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
        </article>
    );
}