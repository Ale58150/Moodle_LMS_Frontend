import { useQuery } from "@tanstack/react-query";
import { GetRoles } from "../Service/RolService";

export function useGetRoles() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: GetRoles,
        staleTime: 1000 * 60 * 10,
    });
}
