import { useState } from "react";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { InscripcionColumns } from "@/features/Inscripciones/Components/inscripcion-columns";
import { DialogCursos } from "@/features/Inscripciones/Components/DialogCursos";
import { DialogEliminarInscripcion } from "@/features/Inscripciones/Components/DialogEliminarInscripcion";
import { useGetInscripciones } from "@/features/Inscripciones/Hook/InscripcionHook";
import { usePermission } from "@/hooks/usePermission";
import { useNavigate } from "react-router-dom";
import { InscripcionIndexType } from "@/features/Inscripciones/Schema/InscripcionSchema";
import { PERMISSIONS } from "@/utils/constants";

export const InscripcionesPage = () => {
  const { data, isLoading, isError, error } = useGetInscripciones(1, 10);
  console.log("data", data);
  const navigate = useNavigate();

  const [openDialogCursos, setOpenDialogCursos] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const [inscripcionSeleccionada, setInscripcionSeleccionada] = useState<InscripcionIndexType | null>(null);

  const { can } = usePermission();
  const puedeEliminar = can(PERMISSIONS.INSCRIPCIONES.ELIMINAR);

  const handleViewCursos = (inscripcion: InscripcionIndexType) => {
    setInscripcionSeleccionada(inscripcion);
    setOpenDialogCursos(true);
  };

  const handleDelete = (inscripcion: InscripcionIndexType) => {
    setInscripcionSeleccionada(inscripcion);
    setOpenDialogEliminar(true);
  };

  const columns = InscripcionColumns({
    onView: () => { navigate(`/inscripciones`) },
    onViewCursos: handleViewCursos,
    onDelete: handleDelete,
    canDelete: puedeEliminar,
  });

  const inscripciones = data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <section className="flex">
        <h1 className="text-2xl font-bold">Inscripciones</h1>
        <Button onClick={() => {
          navigate("/inscripciones/crear");
        }}>Crear Inscripción</Button>
      </section>
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <DataTable
          columns={columns}
          data={inscripciones}
        />
      </QueryState>

      <DialogCursos
        open={openDialogCursos}
        onOpenChange={setOpenDialogCursos}
        initialData={inscripcionSeleccionada}
      />

      <DialogEliminarInscripcion
        open={openDialogEliminar}
        onOpenChange={setOpenDialogEliminar}
        inscripcion={inscripcionSeleccionada}
      />
    </div>
  );
}
