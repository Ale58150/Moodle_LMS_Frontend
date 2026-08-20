"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEstudiante } from "./FormEstudiante";
import { EstudianteFormType } from "../Schema/EstudianteSchema";

interface DialogEstudianteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: EstudianteFormType;
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