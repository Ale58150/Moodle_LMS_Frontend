"use client";

import { useState } from "react";

import { CursosList } from "@/features/Curso/Components/CursosList";
import { CursosToolbar } from "@/features/Curso/Components/CursosToolbar";
import { DialogCurso } from "@/features/Curso/Components/DialogCurso";
import { CursoType } from "@/features/Curso/Schema/CursoSchema";

export default function CursosPage() {
    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState("");

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [cursoSeleccionado, setCursoSeleccionado] =
        useState<CursoType | undefined>(undefined);

    const limpiarFiltros = () => {
        setSearch("");
        setCategoria("");
    };

    const abrirCrear = () => {
        setCursoSeleccionado(undefined);
        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (curso: CursoType) => {
        setCursoSeleccionado(curso);
        setMode("edit");
        setOpen(true);
    };

    return (
        <div className="space-y-6 p-6">

            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Cursos
                    </h1>

                    <p className="text-muted-foreground">
                        Explora y administra los cursos disponibles.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={abrirCrear}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Nuevo curso
                </button>
            </div>

            {/* Filtros */}
            <CursosToolbar
                search={search}
                categoria={categoria}
                onSearchChange={setSearch}
                onCategoriaChange={setCategoria}
                onClear={limpiarFiltros}
            />

            {/* Cursos */}
            <CursosList
                search={search}
                categoria={categoria}
                onEditar={abrirEditar}
            />

            {/* Crear / editar */}
            <DialogCurso
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                initialData={cursoSeleccionado}
            />
        </div>
    );
}