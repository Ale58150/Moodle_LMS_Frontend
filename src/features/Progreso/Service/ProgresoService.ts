import { apiService } from "@/api/api";
import { Progreso } from "../Schema/ProgresoSchema";

export async function getProgresoByModuloId(moduloId: string): Promise<Progreso> {
    const response = await apiService.get(`/progreso/me/${moduloId}`);
    return response.data;
}

export async function getProgresoMe(): Promise<Progreso[]> {
    const response = await apiService.get(`/progreso/me`);
    return response.data;
}