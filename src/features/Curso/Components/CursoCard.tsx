"use client";

import {
    Clock3,
    Pencil,
    Trash2,
} from "lucide-react";

import { CursoType } from "../Schema/CursoSchema";

interface CursoItemProps {
    curso: CursoType;
    esAdmin?: boolean;
    onVer?: (curso: CursoType) => void;
    onEditar?: (curso: CursoType) => void;
    onEliminar?: (curso: CursoType) => void;
}

export function CursoItem({
    curso,
    esAdmin = false,
    onVer,
    onEditar,
    onEliminar,
}: CursoItemProps) {
    return (
        <article
            onClick={() => onVer?.(curso)}
            className="
                group
                flex
                w-full
                cursor-pointer
                items-center
                gap-5
                rounded-xl
                border
                border-border/60
                bg-card
                p-4
                transition-all
                duration-200
                hover:border-primary/30
                hover:bg-muted/20
                hover:shadow-sm
            "
        >
            {/* Imagen */}
            <div
                className="
                    h-[110px]
                    w-[170px]
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-muted
                    sm:h-[120px]
                    sm:w-[190px]
                "
            >
                {curso.rutaPortada ? (
                    <img
                        src={curso.rutaPortada}
                        alt={curso.nombre}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-300
                            group-hover:scale-[1.04]
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-xs
                            text-muted-foreground
                        "
                    >
                        Sin imagen
                    </div>
                )}
            </div>

            {/* Información */}
            <div className="min-w-0 flex-1">
                {curso.categoria && (
                    <p className="text-xs font-medium text-primary">
                        {curso.categoria}
                    </p>
                )}

                <h2
                    className="
                        mt-1
                        line-clamp-2
                        text-base
                        font-semibold
                        leading-snug
                        text-foreground
                        transition-colors
                        group-hover:text-primary
                        sm:text-lg
                    "
                >
                    {curso.nombre}
                </h2>

                {curso.descripcionCorta && (
                    <p
                        className="
                            mt-2
                            line-clamp-2
                            max-w-3xl
                            text-sm
                            leading-relaxed
                            text-muted-foreground
                        "
                    >
                        {curso.descripcionCorta}
                    </p>
                )}

                {curso.duracionHoras !== null && (
                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-muted-foreground
                        "
                    >
                        <Clock3 className="h-3.5 w-3.5" />

                        <span>
                            {curso.duracionHoras}{" "}
                            {curso.duracionHoras === 1
                                ? "hora"
                                : "horas"}
                        </span>
                    </div>
                )}
            </div>

            {/* Acciones administrador */}
            {esAdmin && (
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        opacity-0
                        transition-opacity
                        duration-200
                        group-hover:opacity-100
                    "
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <button
                        type="button"
                        onClick={() => onEditar?.(curso)}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-muted-foreground
                            transition-colors
                            hover:bg-muted
                            hover:text-foreground
                        "
                        title="Editar curso"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onEliminar?.(curso)}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-muted-foreground
                            transition-colors
                            hover:bg-destructive/10
                            hover:text-destructive
                        "
                        title="Eliminar curso"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            )}
        </article>
    );
}