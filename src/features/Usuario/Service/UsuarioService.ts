import { apiService } from "@/api/api";
import { ResponseType } from "@/utils/Schema/Response";
import { UserCreateType, UserIndexResponseType, UserUpdateType, UsuarioType } from "../Schema/UsuarioSchema";


export async function GetPaginatedUsers(page: number, perPage: number = 10): Promise<UserIndexResponseType> {
    const response = await apiService.get(`/usuario/usuarios?page=${page}&per_page=${perPage}`);
    return response.data;
}

export async function GetUserById(id: string): Promise<{ success: boolean; data: UsuarioType }> {
    const response = await apiService.get(`/usuarios/${id}`);
    return response.data;
}

export async function CreateUser(data: UserCreateType): Promise<{ success: boolean; message: string; data: UsuarioType }> {
    const response = await apiService.post("/usuarios/usuarios", data);
    return response.data;
}

export async function UpdateUser(id: string, data: UserUpdateType): Promise<{ success: boolean; message: string; data: UsuarioType }> {
    const response = await apiService.patch(`/usuarios/${id}`, data);
    return response.data;
}

export async function DeleteUserLogically(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/usuarios/${id}`);
    return response.data;
}
