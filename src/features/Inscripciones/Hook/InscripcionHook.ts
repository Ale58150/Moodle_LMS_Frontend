import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
    CrearInscripcion,
    ObtenerCursos,
    ObtenerModulosPorCurso,
    ObtenerEstudiantes,
} from "../Service/InscripcionService";

export function useCrearInscripcion() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: CrearInscripcion,
        onSuccess: () => {
            toast.success("Inscripción creada exitosamente");
            navigate("/inscripciones");
        },
        onError: () => {
            toast.error("Error al crear la inscripción");
        },
    });
}

export function useCursos() {
    return useQuery({
        queryKey: ["inscripciones", "cursos"],
        queryFn: ObtenerCursos,
    });
}

export function useModulosPorCurso(cursoId: string | null) {
    return useQuery({
        queryKey: ["inscripciones", "modulos", cursoId],
        queryFn: () => ObtenerModulosPorCurso(cursoId!),
        enabled: !!cursoId,
    });
}

export function useEstudiantes() {
    return useQuery({
        queryKey: ["inscripciones", "estudiantes"],
        queryFn: ObtenerEstudiantes,
    });
}