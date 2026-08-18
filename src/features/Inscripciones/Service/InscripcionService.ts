import { apiService } from "@/api/api";
import { CrearInscripcionSchemaType } from "../Schema/InscripcionSchema";

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
