"use client";

import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormModulo } from "./FormModulo";
import { useGetModulo } from "../Hook/ModuloHook";

interface DialogModuloProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    cursoId: string;
    moduloId?: string;
}

export function DialogModulo({ open, onOpenChange, mode, cursoId, moduloId }: DialogModuloProps) {
    const { data: moduloDetail, isLoading } = useGetModulo(moduloId ?? "", mode === "edit" && open);

    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode={mode}
            titleCreate="Nuevo módulo"
            titleEdit="Editar módulo"
            descriptionCreate="Completa la información para crear un nuevo módulo en este curso."
            descriptionEdit="Modifica la información del módulo."
            isLoading={isLoading}
            loadingLabel="Cargando información del módulo..."
        >
            <FormModulo
                mode={mode}
                cursoId={cursoId}
                initialData={mode === "edit" ? moduloDetail : undefined}
                onSuccess={() => onOpenChange(false)}
            />
        </EntityDialog>
    );
}