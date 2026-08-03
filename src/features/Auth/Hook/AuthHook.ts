import { LoginUser, LogoutUser } from "../Service/AuthService";
import { LoginResponseType } from "../Schema/AuthSchema";
import { useMutation } from "@tanstack/react-query";
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
            const { token, usuario } = response;
            login(
                token,
                usuario
            );
            if (usuario.estado === 2) {
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
            navigate("/login");
        }
    });
}