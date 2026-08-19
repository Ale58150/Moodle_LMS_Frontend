import { apiService } from "@/api/api";
import { RolesResponseType } from "../Schema/RolSchema";

export async function GetRoles(): Promise<RolesResponseType> {
    const response = await apiService.get("/rols");
    return response.data;
}