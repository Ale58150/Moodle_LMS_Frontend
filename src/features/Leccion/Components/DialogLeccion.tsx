"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Editar lección" : "Nueva lección"}</DialogTitle>
                    <DialogDescription>
                        {mode === "edit"
                            ? "Modifica la información de la lección."
                            : "Completa la información para crear una nueva lección en este módulo."}
                    </DialogDescription>
                </DialogHeader>

                {mode === "edit" && isLoading ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">Cargando información de la lección...</div>
                ) : (
                    <>
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
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}