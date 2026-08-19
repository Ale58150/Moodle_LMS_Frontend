"use client";

import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormUsuario } from "./FormUsuario";
import { useGetUser } from "../Hook/UsuarioHook";

interface DialogUsuarioProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    userId?: string;
}

export function DialogUsuario({ open, onOpenChange, mode, userId }: DialogUsuarioProps) {
    const { data: userDetail, isLoading } = useGetUser(userId ?? "");

    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode={mode}
            titleCreate="Nuevo usuario"
            titleEdit="Editar usuario"
            descriptionCreate="Completa la información para registrar un nuevo usuario."
            descriptionEdit="Modifica la información del usuario."
            isLoading={isLoading}
            loadingLabel="Cargando información del usuario..."
        >
            <FormUsuario
                mode={mode}
                initialData={mode === "edit" ? userDetail : undefined}
                onSuccess={() => onOpenChange(false)}
            />
        </EntityDialog>
    );
}