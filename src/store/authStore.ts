import { create } from "zustand";

interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido_paterno: string;
    correo: string;
    estado: number;
}

interface AuthState {
    token: string | null;
    usuario: Usuario | null;
    login: (token: string, usuario: Usuario) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    usuario: JSON.parse(localStorage.getItem("usuario") || "null"),

    login: (token, usuario) => {

        localStorage.setItem("token", token);
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        set({
            token,
            usuario
        });
    },

    logout: () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        set({
            token: null,
            usuario: null
        });
    }
}));