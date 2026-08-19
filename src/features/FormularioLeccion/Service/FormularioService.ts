// features/FormularioLeccion/Service/FormularioService.ts
import { apiService } from "@/api/api";
import {
    FormularioAdminType,
    CreateFormularioType,
    CreatePreguntaType,
    UpdatePreguntaType,
    CreateOpcionType,
    UpdateOpcionType,
    PreguntaAdminType,
    OpcionAdminType,
} from "../Schema/FormularioSchema";

export async function GetFormularioAdmin(leccionId: string): Promise<FormularioAdminType | null> {
    const response = await apiService.get(`/lecciones/${leccionId}/formulario/admin`);
    return response.data;
}

export async function CreateFormulario(
    leccionId: string,
    data: CreateFormularioType,
): Promise<FormularioAdminType> {
    const response = await apiService.post(`/lecciones/${leccionId}/formulario`, data);
    return response.data;
}

export async function DeleteFormulario(id: string): Promise<void> {
    await apiService.delete(`/formularios-leccion/${id}`);
}

export async function AddPregunta(
    formularioId: string,
    data: CreatePreguntaType,
): Promise<PreguntaAdminType> {
    const response = await apiService.post(`/formularios-leccion/${formularioId}/preguntas`, data);
    return response.data;
}

export async function UpdatePregunta(id: string, data: UpdatePreguntaType): Promise<PreguntaAdminType> {
    const response = await apiService.patch(`/preguntas-formulario/${id}`, data);
    return response.data;
}

export async function DeletePregunta(id: string): Promise<void> {
    await apiService.delete(`/preguntas-formulario/${id}`);
}

export async function AddOpcion(preguntaId: string, data: CreateOpcionType): Promise<OpcionAdminType> {
    const response = await apiService.post(`/preguntas-formulario/${preguntaId}/opciones`, data);
    return response.data;
}

export async function UpdateOpcion(id: string, data: UpdateOpcionType): Promise<OpcionAdminType> {
    const response = await apiService.patch(`/opciones-formulario/${id}`, data);
    return response.data;
}

export async function DeleteOpcion(id: string): Promise<void> {
    await apiService.delete(`/opciones-formulario/${id}`);
}