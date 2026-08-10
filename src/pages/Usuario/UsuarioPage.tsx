"use client";
import { useState } from "react";
import { AppTitle } from "@/components/common/Apptittle";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { UsuarioColumns } from "@/features/Usuario/Components/usuario-columns";
import { DialogUsuario } from "@/features/Usuario/Components/DialogUsuario";
import {
    useGetUsers,
    useDeleteUser,
} from "@/features/Usuario/Hook/UsuarioHook";
import { UsuarioType } from "@/features/Usuario/Schema/UsuarioSchema";
import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function UsuarioPage() {
    const [page, setPage] = useState(1);

    const [selectedUser, setSelectedUser] =
        useState<UsuarioType | undefined>(undefined);

    const [dialogOpen, setDialogOpen] = useState(false);

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
    const handleEdit = (usuario: UsuarioType) => {
        setSelectedUser(usuario);
        setDialogOpen(true);
    };
    const handleDelete = (id: string) => {
        deleteUser.mutate(id);
    };
    const columns = UsuarioColumns({
        onEdit: handleEdit,

        onDelete: handleDelete,

        canEdit: can(
            PERMISSIONS.USUARIOS.EDITAR
        ),

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
                filterColumn="nombre"
                filterPlaceholder="Buscar usuario..."
            />
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Total:{" "}
                    {data?.pagination.total ?? 0}
                    {" usuarios"}
                </span>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        disabled={page <= 1}
                        onClick={() =>
                            setPage((prev) => prev - 1)
                        }
                    >
                        Anterior
                    </Button>

                    <span className="flex items-center px-3 text-sm">
                        Página{" "}
                        {data?.pagination.current_page ?? page}
                        {" de "}
                        {data?.pagination.last_page ?? 1}
                    </span>

                    <Button
                        variant="outline"
                        disabled={
                            page >=
                            (data?.pagination.last_page ?? 1)
                        }
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