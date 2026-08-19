"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEstudiante } from "./FormEstudiante";

interface DialogEstudianteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
}

export function DialogEstudiante({
  open,
  onOpenChange,
  initialData,
}: DialogEstudianteProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Crear Estudiante</DialogTitle>
        </DialogHeader>
        <FormEstudiante
          initialData={initialData}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}