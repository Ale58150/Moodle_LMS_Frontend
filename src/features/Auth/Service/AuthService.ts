import { apiService } from "@/api/api";
import { AuthSchemaType, LoginResponseType, ResetPasswordSchemaType, UserMeResponseType } from "../Schema/AuthSchema";
import { ResponseType } from "@/utils/Schema/Response";

export async function LoginUser(data: AuthSchemaType): Promise<LoginResponseType> {
    const response = await apiService.post("/auth/login", data);
    return response.data;
}

export async function LogoutUser() {
    const response = await apiService.post("/auth/logout");
    return response;
}

export async function ChangePassword(data: ResetPasswordSchemaType): Promise<ResponseType> {
    const payload = {
        password: data.new_password
    };
    const response = await apiService.post("/auth/change-password", payload);
    return response.data
}

export async function MeProfile(): Promise<UserMeResponseType> {
    const response = await apiService.get("/auth/me");
    return response.data;
}