import { apiService } from "@/api/api";
import { CrearInscripcionSchemaType } from "../Schema/InscripcionSchema";
import { CrearEstudianteSchemaType } from "../Schema/EstudianteSchema";

export async function CrearInscripcion(data: CrearInscripcionSchemaType) {
    const response = await apiService.post("/inscripciones/multiple", data);
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