import { ChangePassword, LoginUser, LogoutUser, MeProfile } from "../Service/AuthService";
import { LoginResponseType } from "../Schema/AuthSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const login = useAuthStore(
        (state) => state.login
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: LoginUser,
        onSuccess: (response: LoginResponseType) => {
            login(response)
            if (response.usuario.estado === "pendiente") {
                navigate("/cambiar-password");
                return;
            }
            toast.success("Bienvenido a Elite Academy");
            navigate("/inicio", { replace: true });
        },
        onError: () => {
            toast.error("Credenciales incorrectas");
        }
    });
}

export function useLogout() {
    const logout = useAuthStore(
        state => state.logout
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: LogoutUser,
        onSettled: () => {
            logout();
            navigate("/login", { replace: true });
        }
    });
}

export function useChangePassword() {
    const logout = useAuthStore(
        state => state.logout
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ChangePassword,
        onSuccess: () => {
            logout();
            toast.success("Contraseña cambiada exitosamente");
            navigate("/login", { replace: true });
        },
        onError: () => {
            toast.error("Error al cambiar la contraseña");
        }
    });
}

export function useMeProfile() {
    const token = useAuthStore((state) => state.token);

    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: MeProfile,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        select: (response) => response.data,
    });
}