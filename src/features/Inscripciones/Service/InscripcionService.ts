import { apiService } from "@/api/api";
import { CrearInscripcionSchemaType } from "../Schema/InscripcionSchema";

export async function CrearInscripcion(data: CrearInscripcionSchemaType) {
    const response = await apiService.post("/inscripciones", data);
    return response.data;
}

export async function ObtenerCursos() {
    const response = await apiService.get("/cursos");
    return response.data;
}

export async function ObtenerModulosPorCurso(cursoId: string) {
    const response = await apiService.get(`/cursos/${cursoId}/modulos`);
    return response.data;
}

export async function ObtenerEstudiantes() {
    const response = await apiService.get("/user/estudiantes");
    return response.data;
}
