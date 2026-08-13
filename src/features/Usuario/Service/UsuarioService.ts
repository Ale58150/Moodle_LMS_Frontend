import { apiService } from "@/api/api";
import { ResponseType } from "@/utils/Schema/Response";
import { UserCreateType, UserIndexResponseType, UserUpdateType } from "../Schema/UsuarioSchema";


export async function GetPaginatedUsers(page: number, limit: number = 10): Promise<UserIndexResponseType> {
    const response = await apiService.get(`/user?page=${page}&limit=${limit}`);
    return response.data;
}

export async function GetUserById(id: string): Promise<{ success: boolean; data: UsuarioType }> {
    const response = await apiService.get(`/usuario/usuarios/${id}`);
    return response.data;
}

export async function CreateUser(data: UserCreateType): Promise<{ success: boolean; message: string; data: UsuarioType }> {
    const response = await apiService.post("/usuario/usuarios", data);
    return response.data;
}

export async function UpdateUser(id: string, data: UserUpdateType): Promise<{ success: boolean; message: string; data: UsuarioType }> {
    const response = await apiService.patch(`/usuario/usuarios/${id}`, data);
    return response.data;
}

export async function DeleteUserLogically(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/usuario/usuarios/${id}`);
    return response.data;
}

export async function SearchUsers(q: string) {
    const response = await apiService.get(`/user/search?q=${encodeURIComponent(q)}`);
    return response.data;
}