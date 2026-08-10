"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseType } from "@/features/Auth/Schema/AuthSchema";

type Usuario = LoginResponseType["usuario"];
type Menu = LoginResponseType["menu"];
type Permisos = LoginResponseType["permisos"];

interface AuthState {
    token: string | null;
    usuario: Usuario | null;
    rol: string | null;
    permisos: Permisos;
    menu: Menu | null;

    login: (data: LoginResponseType) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            usuario: null,
            rol: null,
            permisos: [],
            menu: null,

            login: (data) => {
                const {
                    token,
                    usuario,
                    rol,
                    permisos,
                    menu,
                } = data;

                set({
                    token,
                    usuario,
                    rol,
                    permisos,
                    menu,
                });
            },

            logout: () => {
                set({
                    token: null,
                    usuario: null,
                    rol: null,
                    permisos: [],
                    menu: null,
                });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
