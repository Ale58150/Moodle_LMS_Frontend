"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { FormModulo } from "./FormModulo";
import { useGetModulo } from "../Hook/ModuloHook";

interface DialogModuloProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    cursoId: string;
    moduloId?: string;
}

export function DialogModulo({
    open,
    onOpenChange,
    mode,
    cursoId,
    moduloId,
}: DialogModuloProps) {
    const { data: moduloDetail, isLoading } = useGetModulo(
        moduloId ?? "",
        mode === "edit" && open,
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Editar módulo" : "Nuevo módulo"}</DialogTitle>
                    <DialogDescription>
                        {mode === "edit"
                            ? "Modifica la información del módulo."
                            : "Completa la información para crear un nuevo módulo en este curso."}
                    </DialogDescription>
                </DialogHeader>

                {mode === "edit" && isLoading ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                        Cargando información del módulo...
                    </div>
                ) : (
                    <FormModulo
                        mode={mode}
                        cursoId={cursoId}
                        initialData={mode === "edit" ? moduloDetail : undefined}
                        onSuccess={() => onOpenChange(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}