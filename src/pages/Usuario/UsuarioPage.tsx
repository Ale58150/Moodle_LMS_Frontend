"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTitle } from "@/components/common/Apptittle";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/common/QueryState";
import { MascotSinPermiso } from "@/components/common/mascots";
import { UsuarioColumns } from "@/features/Usuario/Components/usuario-columns";
import { DialogUsuario } from "@/features/Usuario/Components/DialogUsuario";

import { useGetUsers, useDeleteUser } from "@/features/Usuario/Hook/UsuarioHook";
import { UsuarioIndexType } from "@/features/Usuario/Schema/UsuarioSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function UsuarioPage() {
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<UsuarioIndexType | undefined>(undefined);
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
    const perPage = 10;

    const { can } = usePermission();
    const puedeVer = can(PERMISSIONS.USUARIOS.VER);
    const puedeCrear = can(PERMISSIONS.USUARIOS.CREAR);
    const puedeEliminar = can(PERMISSIONS.USUARIOS.ELIMINAR);

    const { data, isLoading, isError, error } = useGetUsers(page, perPage);

    const deleteUser = useDeleteUser();

    const handleCreate = () => {
        setSelectedUser(undefined);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteUser.mutate(id);
    };

    const columns = UsuarioColumns({
        onView: (id: string) => navigate(`/usuario/${id}`),
        onDelete: handleDelete,
        canDelete: puedeEliminar,
    });

    const usuarios = data?.data ?? [];
    const totalPages = data?.meta.totalPages ?? 1;
    const currentPage = data?.meta.page ?? page;
    const totalUsers = data?.meta.total ?? 0;

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <AppTitle title="Usuarios" subtitle="Administra y gestiona a los usuarios" />

                {puedeCrear && (
                    <Button onClick={handleCreate}>Nuevo Usuario</Button>
                )}
            </div>

            {!puedeVer ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center">
                    <MascotSinPermiso className="h-32 w-auto" />
                    <div>
                        <p className="text-sm font-medium">No tienes permisos para ver los usuarios</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Si crees que es un error, contacta a un administrador.
                        </p>
                    </div>
                </div>
            ) : (
                <QueryState isLoading={isLoading} isError={isError} error={error}>
                    <DataTable
                        columns={columns}
                        data={usuarios}
                        filterColumn="username"
                        filterPlaceholder="Buscar usuario..."
                    />

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total: {totalUsers} usuarios</span>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                disabled={currentPage <= 1}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Anterior
                            </Button>

                            <span className="px-3 text-sm">
                                Página {currentPage} de {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                disabled={currentPage >= totalPages}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </QueryState>
            )}

            <DialogUsuario
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={selectedUser ? "edit" : "create"}
                userId={selectedUser?.id}
            />
        </div>
    );
}