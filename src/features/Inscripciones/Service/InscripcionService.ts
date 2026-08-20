import { apiService } from "@/api/api";
import { CrearInscripcionSchemaType } from "../Schema/InscripcionSchema";
import { CrearEstudianteSchemaType } from "../Schema/EstudianteSchema";

export async function CrearInscripcion(data: CrearInscripcionSchemaType) {
    const response = await apiService.post("/inscripciones/multiple", data);
    return response.data;
}

export async function ObtenerInscripciones(page: number, limit: number = 10) {
    const response = await apiService.get(`/inscripciones/paginated?page=${page}&limit=${limit}`);
    return response.data;
}

export async function ObtenerCursos() {
    const response = await apiService.get("/curso/curso-modulos");
    return response.data;
}

export async function ObtenerEstudiantes() {
    const response = await apiService.get("/user/estudiantes");
    return response.data;
}

export async function CrearEstudiante(data: CrearEstudianteSchemaType) {
    const response = await apiService.post("/user/crear-estudiante", data);
    return response.data;
}

export async function EliminarCursoInscripcion(inscripcionId: string, cursoId: string) {
    const response = await apiService.delete(`/inscripciones/${inscripcionId}/cursos/${cursoId}`);
    return response.data;
}

export async function EliminarModuloInscripcion(inscripcionId: string, cursoId: string, moduloId: string) {
    const response = await apiService.delete(`/inscripciones/${inscripcionId}/cursos/${cursoId}/modulos/${moduloId}`);
    return response.data;
}