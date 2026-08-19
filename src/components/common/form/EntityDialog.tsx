"use client";

import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface EntityDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";

    titleCreate: string;
    titleEdit: string;
    descriptionCreate: string;
    descriptionEdit: string;

    isLoading?: boolean;
    loadingLabel?: string;

    maxWidth?: string;

    children: ReactNode;
}

export function EntityDialog({
    open,
    onOpenChange,
    mode,
    titleCreate,
    titleEdit,
    descriptionCreate,
    descriptionEdit,
    isLoading = false,
    loadingLabel = "Cargando información...",
    maxWidth = "max-w-2xl",
    children,
}: EntityDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? titleEdit : titleCreate}</DialogTitle>
                    <DialogDescription>{mode === "edit" ? descriptionEdit : descriptionCreate}</DialogDescription>
                </DialogHeader>

                {mode === "edit" && isLoading ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">{loadingLabel}</div>
                ) : (
                    children
                )}
            </DialogContent>
        </Dialog>
    );
}