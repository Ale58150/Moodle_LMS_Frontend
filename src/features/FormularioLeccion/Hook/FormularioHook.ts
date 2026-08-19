// features/FormularioLeccion/Hook/FormularioHook.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    GetFormularioAdmin,
    CreateFormulario,
    DeleteFormulario,
    AddPregunta,
    UpdatePregunta,
    DeletePregunta,
    AddOpcion,
    UpdateOpcion,
    DeleteOpcion,
} from "../Service/FormularioService";
import {
    CreateFormularioType,
    CreatePreguntaType,
    UpdatePreguntaType,
    CreateOpcionType,
    UpdateOpcionType,
} from "../Schema/FormularioSchema";
import { GetLeccionesByModulo } from "@/features/Leccion/Service/LeccionService";

export function useGetFormularioAdmin(leccionId: string, enabled = true) {
    return useQuery({
        queryKey: ["formulario", "admin", leccionId],
        queryFn: () => GetFormularioAdmin(leccionId),
        enabled: enabled && !!leccionId,
    });
}

export function useCreateFormulario(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateFormularioType) => CreateFormulario(leccionId, data),
        onSuccess: () => {
            toast.success("Formulario creado con éxito");
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al crear el formulario"),
    });
}

export function useDeleteFormulario(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteFormulario(id),
        onSuccess: () => {
            toast.success("Formulario eliminado");
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al eliminar el formulario"),
    });
}

export function useAddPregunta(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formularioId, data }: { formularioId: string; data: CreatePreguntaType }) =>
            AddPregunta(formularioId, data),
        onSuccess: () => {
            toast.success("Pregunta agregada");
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al agregar la pregunta"),
    });
}

export function useUpdatePregunta(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePreguntaType }) => UpdatePregunta(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al actualizar la pregunta"),
    });
}

export function useDeletePregunta(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeletePregunta(id),
        onSuccess: () => {
            toast.success("Pregunta eliminada");
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al eliminar la pregunta"),
    });
}

export function useAddOpcion(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ preguntaId, data }: { preguntaId: string; data: CreateOpcionType }) =>
            AddOpcion(preguntaId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al agregar la opción"),
    });
}

export function useUpdateOpcion(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateOpcionType }) => UpdateOpcion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al actualizar la opción"),
    });
}

export function useDeleteOpcion(leccionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteOpcion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["formulario", "admin", leccionId] });
        },
        onError: () => toast.error("Error al eliminar la opción (mínimo 2 por pregunta)"),
    });
}

export function useGetLecciones(
    moduloId: string,
    filtros?: { nombre?: string; tipoLeccion?: string; estaPublicada?: boolean }
) {
    return useQuery({
        queryKey: ["lecciones", "byModulo", moduloId, filtros],
        queryFn: () => GetLeccionesByModulo(moduloId, filtros),
        enabled: !!moduloId,
        staleTime: 1000 * 60 * 2,
    });
}