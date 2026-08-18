// features/Leccion/Components/LeccionBloqueadaDialog.tsx
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface LeccionBloqueadaDialogProps {
    open: boolean;
    motivo: "no_inscrito" | "leccion_anterior_pendiente" | null;
    cursoId: string;
    moduloId: string;
}

export function LeccionBloqueadaDialog({ open, motivo, cursoId, moduloId }: LeccionBloqueadaDialogProps) {
    const navigate = useNavigate();
    const esNoInscrito = motivo === "no_inscrito";

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <AlertDialogTitle className="text-center">
                        {esNoInscrito ? "Necesitas inscribirte a este módulo" : "Todavía no puedes ver esta lección"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {esNoInscrito
                            ? "Esta lección no es de vista previa. Inscríbete al módulo para acceder a todo el contenido."
                            : "Completa la lección anterior para desbloquear esta."}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel onClick={() => navigate(`/cursos/${cursoId}/modulos/${moduloId}`)}>
                        Volver al módulo
                    </AlertDialogCancel>

                    {esNoInscrito && (
                        <AlertDialogAction onClick={() => navigate(`/cursos/${cursoId}`)}>
                            Ver cómo inscribirme
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}