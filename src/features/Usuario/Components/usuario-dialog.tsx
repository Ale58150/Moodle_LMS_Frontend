"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Pencil,
    Trash2,
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
    onEdit: (usuario: UsuarioIndexType) => void;
    onDelete: (id: string) => void;
    canEdit: boolean;
    canDelete: boolean;
}

export function UsuarioColumns({
    onEdit,
    onDelete,
    canEdit,
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
            cell: ({ row }) => (
                <span>
                    {row.original.correoVerificadoEn
                        ? "Sí"
                        : "No"}
                </span>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Última actualización",
            cell: ({ row }) => (
                <span>
                    {new Date(
                        row.original.updatedAt
                    ).toLocaleDateString()}
                </span>
            ),
        },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => {
                const usuario = row.original;

                if (!canEdit && !canDelete) {
                    return null;
                }

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