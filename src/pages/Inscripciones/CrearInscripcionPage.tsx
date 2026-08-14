import { CrearInscripcionForm } from "@/features/Inscripciones/Components/crear_inscripcion_form";

export const CrearInscripcionPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="w-full max-w-md">
                <CrearInscripcionForm />
            </div>
        </div>
    );
};
