import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { LeccionesToolbar } from "@/features/Leccion/Components/LeccionesToolbar";
import { LeccionListItemType } from "@/features/Leccion/Schema/LeccionSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";
import { useGetModulo } from "@/features/Modulo/Hook/ModuloHook";
import { LeccionesList } from "@/features/Leccion/Components/LeccionesList";
import { DialogLeccion } from "@/features/Leccion/Components/DialogLeccion";

export default function ModuloDetallePage() {
    const { id: cursoId, moduloId } = useParams<{ id: string; moduloId: string }>();
    const navigate = useNavigate();

    const { data: modulo, isLoading, isError } = useGetModulo(moduloId!);

    const { can } = usePermission();
    const puedeCrear = can(PERMISSIONS.LECCIONES.CREAR);
    const puedeEditar = can(PERMISSIONS.LECCIONES.EDITAR);
    const puedeEliminar = can(PERMISSIONS.LECCIONES.ELIMINAR);

    const [modoAdmin, setModoAdmin] = useState(false);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [leccionIdSeleccionada, setLeccionIdSeleccionada] = useState<string | undefined>(undefined);

    const abrirCrear = () => {
        setLeccionIdSeleccionada(undefined);
        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (leccion: LeccionListItemType) => {
        setLeccionIdSeleccionada(leccion.id);
        setMode("edit");
        setOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !modulo) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-destructive">No se pudo cargar el módulo.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/cursos/${cursoId}`)}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al curso
            </Button>

            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{modulo.nombre}</h1>

                {modulo.otorgaCertificacion && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Certifica
                    </span>
                )}
            </div>

            {modulo.fraseMotivacional && <p className="italic text-muted-foreground">{modulo.fraseMotivacional}</p>}
            {modulo.descripcion && <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{modulo.descripcion}</p>}

            <div className="space-y-4 border-t pt-6">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight">Lecciones</h2>

                    {(puedeCrear || puedeEditar) && (
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={() => setModoAdmin((prev) => !prev)}>
                                {modoAdmin ? "Ver como estudiante" : "Administrar lecciones"}
                            </Button>

                            {modoAdmin && puedeCrear && (
                                <Button type="button" size="sm" onClick={abrirCrear}>
                                    Nueva lección
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {modoAdmin ? (
                    <>
                        <LeccionesToolbar search={search} onSearchChange={setSearch} onClear={() => setSearch("")} />

                        <LeccionesList
                            moduloId={moduloId!}
                            search={search}
                            onEditar={abrirEditar}
                            puedeEditar={puedeEditar}
                            puedeEliminar={puedeEliminar}
                        />
                    </>
                ) : (
                    <LeccionesTimeline moduloId={moduloId!} />
                )}
            </div>

            <DialogLeccion
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                moduloId={moduloId!}
                leccionId={leccionIdSeleccionada}
            />
        </div>
    );
}