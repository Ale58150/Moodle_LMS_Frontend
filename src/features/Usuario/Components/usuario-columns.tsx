"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Trash2,
    Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UsuarioIndexType } from "../Schema/UsuarioSchema";

interface UsuarioColumnsProps {
    onDelete: (id: string) => void;
    onView: (id: string) => void;
    canDelete: boolean;
}

export function UsuarioColumns({
    onDelete,
    onView,
    canDelete,
}: UsuarioColumnsProps): ColumnDef<UsuarioIndexType>[] {
    return [
        {
            accessorKey: "username",
            header: "Usuario",
        },

        {
            accessorKey: "correo",
            header: "Correo",
        },

        {
            accessorKey: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const estado = row.original.estado.toLowerCase();

                return (
                    <Badge
                        variant={
                            estado === "activo"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {row.original.estado}
                    </Badge>
                );
            },
        },

        {
            accessorKey: "correoVerificadoEn",
            header: "Correo verificado",
            cell: ({ row }) => {
                const fecha = row.original.correoVerificadoEn;

                if (!fecha) {
                    return (
                        <Badge variant="secondary">
                            No verificado
                        </Badge>
                    );
                }

                return (
                    <Badge variant="default">
                        Verificado
                    </Badge>
                );
            },
        },

        {
            accessorKey: "updatedAt",
            header: "Actualizado",
            cell: ({ row }) => {
                return new Date(
                    row.original.updatedAt
                ).toLocaleDateString("es-ES");
            },
        },

        {
            id: "acciones",
            header: "Acciones",

            cell: ({ row }) => {
                const usuario = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">
                                    Abrir menú
                                </span>

                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Acciones
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    onView(usuario.id)
                                }
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver usuario
                            </DropdownMenuItem>

                            {canDelete && (
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                        onDelete(usuario.id)
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}