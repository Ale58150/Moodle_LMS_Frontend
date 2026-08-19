"use client";

import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormCurso } from "./FormCurso";
import { CursoType } from "../Schema/CursoSchema";

interface DialogCursoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    initialData?: CursoType;
}

export function DialogCurso({ open, onOpenChange, mode, initialData }: DialogCursoProps) {
    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode={mode}
            titleCreate="Nuevo curso"
            titleEdit="Editar curso"
            descriptionCreate="Completa la información para crear un nuevo curso."
            descriptionEdit="Modifica la información del curso."
            maxWidth="max-w-3xl"
        >
            <FormCurso mode={mode} initialData={initialData} onSuccess={() => onOpenChange(false)} />
        </EntityDialog>
    );
}