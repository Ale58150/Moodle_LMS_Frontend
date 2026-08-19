"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { FormCurso } from "./FormCurso";
import { CursoType } from "../Schema/CursoSchema";

interface DialogCursoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    initialData?: CursoType;
}

export function DialogCurso({
    open,
    onOpenChange,
    mode,
    initialData,
}: DialogCursoProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit"
                            ? "Editar curso"
                            : "Nuevo curso"}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === "edit"
                            ? "Modifica la información del curso."
                            : "Completa la información para crear un nuevo curso."}
                    </DialogDescription>
                </DialogHeader>

                <FormCurso
                    mode={mode}
                    initialData={initialData}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}