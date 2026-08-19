"use client";

import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormLeccion } from "./FormLeccion";
import { RecursosLeccionManager } from "./RecursosLeccionManager";
import { useGetLeccion } from "../Hook/LeccionHook";
import { FormularioLeccionManager } from "@/features/FormularioLeccion/Components/FormularioLeccionManager";

interface DialogLeccionProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    moduloId: string;
    leccionId?: string;
}

export function DialogLeccion({ open, onOpenChange, mode, moduloId, leccionId }: DialogLeccionProps) {
    const { data: leccionDetail, isLoading } = useGetLeccion(leccionId ?? "", mode === "edit" && open);

    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode={mode}
            titleCreate="Nueva lección"
            titleEdit="Editar lección"
            descriptionCreate="Completa la información para crear una nueva lección en este módulo."
            descriptionEdit="Modifica la información de la lección."
            isLoading={isLoading}
            loadingLabel="Cargando información de la lección..."
        >
            <FormLeccion
                mode={mode}
                moduloId={moduloId}
                initialData={mode === "edit" ? leccionDetail : undefined}
                onSuccess={() => {
                    if (mode === "create") onOpenChange(false);
                }}
            />

            {mode === "edit" && leccionDetail && (
                <>
                    <RecursosLeccionManager leccionId={leccionDetail.id} />
                    <FormularioLeccionManager leccionId={leccionDetail.id} />
                </>
            )}
        </EntityDialog>
    );
}