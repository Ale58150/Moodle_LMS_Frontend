import { Loader2 } from "lucide-react";
import { useGetFormularioAdmin } from "../Hook/FormularioHook";
import { FormularioEditor } from "./FormularioEditor";
import { FormularioBuilder } from "./FormularioBuilder";

interface FormularioLeccionManagerProps {
    leccionId: string;
}

export function FormularioLeccionManager({ leccionId }: FormularioLeccionManagerProps) {
    const { data: formulario, isLoading } = useGetFormularioAdmin(leccionId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center rounded-lg border bg-muted/10 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-3 rounded-lg border bg-muted/10 p-4">
            <div>
                <p className="text-sm font-medium">Checkpoint de la lección</p>
                <p className="text-xs text-muted-foreground">
                    Preguntas que el estudiante debe responder bien para poder completar esta lección.
                </p>
            </div>

            {formulario ? (
                <FormularioEditor leccionId={leccionId} formulario={formulario} />
            ) : (
                <FormularioBuilder leccionId={leccionId} />
            )}
        </div>
    );
}