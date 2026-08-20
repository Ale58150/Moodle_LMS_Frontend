import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Layers, Trash2, AlertTriangle, Check } from "lucide-react";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";
import { useEliminarCurso, useEliminarModulo } from "../Hook/InscripcionHook";

interface DialogEliminarInscripcionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inscripcion: InscripcionIndexType | null;
}

export function DialogEliminarInscripcion({
  open,
  onOpenChange,
  inscripcion,
}: DialogEliminarInscripcionProps) {
  const [modulosSeleccionados, setModulosSeleccionados] = useState<Record<string, string[]>>({});
  const [eliminarCursoCompleto, setEliminarCursoCompleto] = useState<Record<string, boolean>>({});

  const eliminarCursoMutation = useEliminarCurso();
  const eliminarModuloMutation = useEliminarModulo();

  const cursos = inscripcion?.cursos ?? [];

  const handleToggleModulo = (cursoId: string, moduloId: string) => {
    setModulosSeleccionados((prev) => {
      const modulosActuales = prev[cursoId] || [];
      const existe = modulosActuales.includes(moduloId);
      return {
        ...prev,
        [cursoId]: existe
          ? modulosActuales.filter((id) => id !== moduloId)
          : [...modulosActuales, moduloId],
      };
    });
    setEliminarCursoCompleto((prev) => ({
      ...prev,
      [cursoId]: false,
    }));
  };

  const handleToggleCursoCompleto = (cursoId: string) => {
    setEliminarCursoCompleto((prev) => ({
      ...prev,
      [cursoId]: !prev[cursoId],
    }));
    setModulosSeleccionados((prev) => ({
      ...prev,
      [cursoId]: [],
    }));
  };

  const handleEliminar = async () => {
    if (!inscripcion) return;

    for (const curso of cursos) {
      if (eliminarCursoCompleto[curso.id]) {
        await eliminarCursoMutation.mutateAsync({
          inscripcionId: inscripcion.id,
          cursoId: curso.id,
        });
      } else {
        const modulos = modulosSeleccionados[curso.id] || [];
        for (const moduloId of modulos) {
          await eliminarModuloMutation.mutateAsync({
            inscripcionId: inscripcion.id,
            cursoId: curso.id,
            moduloId,
          });
        }
      }
    }

    onOpenChange(false);
    setModulosSeleccionados({});
    setEliminarCursoCompleto({});
  };

  const hasSelections = Object.values(eliminarCursoCompleto).some(Boolean) ||
    Object.values(modulosSeleccionados).some((modulos) => modulos.length > 0);

  if (!inscripcion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Eliminar inscripción
          </DialogTitle>
          <DialogDescription>
            Selecciona los cursos o módulos que deseas eliminar de{" "}
            <span className="font-semibold text-foreground">
              {inscripcion.nombre} {inscripcion.apellidoPaterno} {inscripcion.apellidoMaterno}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {cursos.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No hay cursos para eliminar
            </p>
          ) : (
            cursos.map((curso) => (
              <Card key={curso.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {curso.nombre}
                    </CardTitle>
                    <Button
                      variant={eliminarCursoCompleto[curso.id] ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleToggleCursoCompleto(curso.id)}
                    >
                      {eliminarCursoCompleto[curso.id] ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Seleccionado
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar curso
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      Módulos ({curso.modulos.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {curso.modulos
                        .sort((a, b) => a.orden - b.orden)
                        .map((modulo) => {
                          const isSelected = modulosSeleccionados[curso.id]?.includes(modulo.id);
                          return (
                            <Badge
                              key={modulo.id}
                              variant={isSelected ? "destructive" : "secondary"}
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handleToggleModulo(curso.id, modulo.id)}
                            >
                              {isSelected && <Check className="h-3 w-3 mr-1" />}
                              {modulo.nombre}
                            </Badge>
                          );
                        })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setModulosSeleccionados({});
              setEliminarCursoCompleto({});
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleEliminar}
            disabled={!hasSelections || eliminarCursoMutation.isPending || eliminarModuloMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {eliminarCursoMutation.isPending || eliminarModuloMutation.isPending
              ? "Eliminando..."
              : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
