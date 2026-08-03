import { apiService } from "@/api/api";
import { AuthSchemaType } from "../Schema/AuthSchema";

export async function LoginUser(data: AuthSchemaType) {
    const response = await apiService.post("/auth/login", data);
    return response.data.data;
}

export async function LogoutUser() {
    const response = await apiService.post("/auth/logout");
    return response;
}
