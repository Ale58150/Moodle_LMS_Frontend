"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTitle } from "@/components/common/Apptittle";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { UsuarioColumns } from "@/features/Usuario/Components/usuario-columns";
import { DialogUsuario } from "@/features/Usuario/Components/DialogUsuario";

import {
    useGetUsers,
    useDeleteUser,
} from "@/features/Usuario/Hook/UsuarioHook";

import {
    UsuarioIndexType,
} from "@/features/Usuario/Schema/UsuarioSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function UsuarioPage() {
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<UsuarioIndexType | undefined>(undefined);
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
    const perPage = 10;

    const { can } = usePermission();

    const {
        data,
        isLoading,
        isError,
    } = useGetUsers(page, perPage);

    const deleteUser = useDeleteUser();
    if (!can(PERMISSIONS.USUARIOS.VER)) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuarios" />

                <div className="text-red-500">
                    No tienes permisos para ver los usuarios.
                </div>
            </div>
        );
    }

    const handleCreate = () => {
        setSelectedUser(undefined);
        setDialogOpen(true);
    };


    const handleDelete = (id: string) => {
        deleteUser.mutate(id);
    };

    const columns = UsuarioColumns({

        onView: (id: string) => {
            navigate(`/usuario/${id}`);
        },

        onDelete: handleDelete,

        canDelete: can(
            PERMISSIONS.USUARIOS.ELIMINAR
        ),
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuarios" />

                <div className="text-muted-foreground">
                    Cargando usuarios...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuarios" />

                <div className="text-red-500">
                    Error al cargar usuarios.
                </div>
            </div>
        );
    }

    const usuarios = data?.data ?? [];

    const totalPages = data?.meta.totalPages ?? 1;
    const currentPage = data?.meta.page ?? page;
    const totalUsers = data?.meta.total ?? 0;

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <AppTitle title="Usuarios" />

                {can(PERMISSIONS.USUARIOS.CREAR) && (
                    <Button onClick={handleCreate}>
                        Nuevo Usuario
                    </Button>
                )}
            </div>

            <DataTable
                columns={columns}
                data={usuarios}
                filterColumn="username"
                filterPlaceholder="Buscar usuario..."
            />

            <div className="flex items-center justify-between">

                <span className="text-sm text-muted-foreground">
                    Total: {totalUsers} usuarios
                </span>

                <div className="flex gap-2 items-center">

                    <Button
                        variant="outline"
                        disabled={currentPage <= 1}
                        onClick={() =>
                            setPage((prev) => prev - 1)
                        }
                    >
                        Anterior
                    </Button>

                    <span className="px-3 text-sm">
                        Página {currentPage} de {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        disabled={currentPage >= totalPages}
                        onClick={() =>
                            setPage((prev) => prev + 1)
                        }
                    >
                        Siguiente
                    </Button>

                </div>
            </div>

            <DialogUsuario
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={selectedUser ? "edit" : "create"}
                initialData={selectedUser}
            />

        </div>
    );
}