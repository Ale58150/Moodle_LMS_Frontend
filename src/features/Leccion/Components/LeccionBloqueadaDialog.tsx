import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
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
import { MascotSinPermiso, MascotError } from "@/components/common/mascots";

interface LeccionBloqueadaDialogProps {
    open: boolean;
    motivo: "no_inscrito" | "leccion_anterior_pendiente" | null;
    cursoId: string;
    moduloId: string;
    /** Nombre del módulo, para armar un mensaje de WhatsApp más claro. */
    moduloNombre?: string;
}

// Ajusta esto a tu número real (formato internacional, sin "+" ni espacios),
// o muévelo a import.meta.env.VITE_WHATSAPP_CONTACTO si prefieres configurarlo por entorno.
const WHATSAPP_NUMERO = "59170000000";

function construirLinkWhatsapp(moduloNombre?: string) {
    const mensaje = moduloNombre
        ? `Hola, quiero inscribirme al módulo "${moduloNombre}" para poder acceder a sus lecciones.`
        : "Hola, quiero inscribirme a un módulo para poder acceder a sus lecciones.";

    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export function LeccionBloqueadaDialog({
    open,
    motivo,
    cursoId,
    moduloId,
    moduloNombre,
}: LeccionBloqueadaDialogProps) {
    const navigate = useNavigate();
    const esNoInscrito = motivo === "no_inscrito";

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="mx-auto">
                        {esNoInscrito ? (
                            <MascotSinPermiso className="h-28 w-auto" />
                        ) : (
                            <MascotError className="h-28 w-auto" />
                        )}
                    </div>

                    <AlertDialogTitle className="text-center">
                        {esNoInscrito ? "Necesitas inscribirte a este módulo" : "Todavía no puedes ver esta lección"}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center">
                        {esNoInscrito
                            ? "Esta lección no es de vista previa. Escríbenos para activar tu acceso a este módulo."
                            : "Completa la lección anterior para desbloquear esta."}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel onClick={() => navigate(`/cursos/${cursoId}/modulos/${moduloId}`)}>
                        Volver al módulo
                    </AlertDialogCancel>

                    {esNoInscrito && (
                        <AlertDialogAction asChild>
                            <a
                                href={construirLinkWhatsapp(moduloNombre)}
                                target="_blank"
                                rel="noreferrer"
                                className="gap-1.5"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Escribir por WhatsApp
                            </a>
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}