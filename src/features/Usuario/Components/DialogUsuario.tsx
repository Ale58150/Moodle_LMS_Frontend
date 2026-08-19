"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { FormUsuario } from "./FormUsuario";
import { useGetUser } from "../Hook/UsuarioHook";

interface DialogUsuarioProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    userId?: string;
}

export function DialogUsuario({
    open,
    onOpenChange,
    mode,
    userId,
}: DialogUsuarioProps) {
    const {
        data: userDetail,
        isLoading,
    } = useGetUser(userId ?? "");

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit"
                            ? "Editar usuario"
                            : "Nuevo usuario"}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === "edit"
                            ? "Modifica la información del usuario."
                            : "Completa la información para registrar un nuevo usuario."}
                    </DialogDescription>
                </DialogHeader>

                {mode === "edit" && isLoading ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                        Cargando información del usuario...
                    </div>
                ) : (
                    <FormUsuario
                        mode={mode}
                        initialData={
                            mode === "edit"
                                ? userDetail
                                : undefined
                        }
                        onSuccess={() => onOpenChange(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}