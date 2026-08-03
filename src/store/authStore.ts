import { create } from "zustand";
import { LoginResponseType } from "@/features/Auth/Schema/AuthSchema";

type Usuario = LoginResponseType["usuario"];
type Menu = LoginResponseType["menu"];

interface AuthState {
    token: string | null;
    usuario: Usuario | null;
    rol: string | null;
    menu: Menu | null;
    login: (data: LoginResponseType) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    usuario: JSON.parse(localStorage.getItem("usuario") || "null"),
    rol: localStorage.getItem("rol"),
    menu: JSON.parse(localStorage.getItem("menu") || "null"),
    login: (data) => {
        const { token, usuario, rol, menu } = data;
        localStorage.setItem("token", token);
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );
        localStorage.setItem("rol", rol);
        localStorage.setItem("menu", JSON.stringify(menu));

        set({
            token,
            usuario,
            rol,
            menu,
        });
    },

    logout: () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("rol");
        localStorage.removeItem("menu");
        set({
            token: null,
            usuario: null,
            rol: null,
            menu: null,
        });
    }
}));