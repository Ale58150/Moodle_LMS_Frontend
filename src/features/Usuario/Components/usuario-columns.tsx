"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Pencil,
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

import { UsuarioType } from "../Schema/UsuarioSchema";

interface UsuarioColumnsProps {
    onEdit: (usuario: UsuarioType) => void;
    onDelete: (id: string) => void;
    onView: (id: string) => void;
    canEdit: boolean;
    canDelete: boolean;
}

export function UsuarioColumns({
    onEdit,
    onDelete,
    onView,
    canEdit,
    canDelete,
}: UsuarioColumnsProps): ColumnDef<UsuarioType>[] {
    return [
        {
            id: "nombre",
            header: "Nombre",
            cell: ({ row }) => {
                const usuario = row.original;

                return (
                    <div>
                        <div className="font-medium">
                            {usuario.nombre}{" "}
                            {usuario.apellido_paterno}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {usuario.apellido_materno ?? ""}
                        </div>
                    </div>
                );
            },
        },

        {
            accessorKey: "correo",
            header: "Correo",
        },

        {
            id: "documento",
            header: "Documento",
            cell: ({ row }) => (
                <span>
                    {row.original.numero_documento}
                </span>
            ),
        },

        {
            accessorKey: "telefono",
            header: "Teléfono",
            cell: ({ row }) => (
                <span>
                    {row.original.telefono ?? "-"}
                </span>
            ),
        },

        {
            accessorKey: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const estado =
                    row.original.estado.toLowerCase();

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
                                    onView(usuario.id_usuario)
                                }
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver usuario
                            </DropdownMenuItem>
                            {canEdit && (
                                <DropdownMenuItem
                                    onClick={() =>
                                        onEdit(usuario)
                                    }
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </DropdownMenuItem>
                            )}
                            {canDelete && (
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                        onDelete(
                                            usuario.id_usuario
                                        )
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