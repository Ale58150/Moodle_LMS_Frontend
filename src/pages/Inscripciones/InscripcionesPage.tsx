import { Button } from "@/components/ui/button";

export const InscripcionesPage = () => {
  return (
    <div className="space-y-6 p-6">
      inscripciones
      <Button onClick={() => {
        window.location.href = "/inscripciones/crear";
      }}>Crear Inscripción</Button>
    </div>
  );
}