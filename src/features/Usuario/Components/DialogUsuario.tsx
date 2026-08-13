"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { FormUsuario } from "./FormUsuario";
import { UsuarioType } from "../Schema/UsuarioSchema";

interface DialogUsuarioProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    initialData?: UsuarioType;
}

export function DialogUsuario({
    open,
    onOpenChange,
    mode,
    initialData,
}: DialogUsuarioProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit"
                            ? "Editar Usuario"
                            : "Nuevo Usuario"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "edit"
                            ? "Modifica los datos del usuario."
                            : "Completa los datos para registrar un nuevo usuario."}
                    </DialogDescription>
                </DialogHeader>
                <FormUsuario
                    mode={mode}
                    initialData={initialData}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
