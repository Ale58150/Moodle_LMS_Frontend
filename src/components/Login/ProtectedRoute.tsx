import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export function ProtectedRoute({
    allowedRoles,
}: ProtectedRouteProps) {
    const token = useAuthStore(
        (state) => state.token
    );

    const rol = useAuthStore(
        (state) => state.rol
    );

    const usuario = useAuthStore(
        (state) => state.usuario
    );

    const location = useLocation();

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const estaCambiandoPassword =
        location.pathname === "/cambiar-password";

    if (
        usuario?.estado === "pendiente" &&
        !estaCambiandoPassword
    ) {
        return (
            <Navigate
                to="/cambiar-password"
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !rol.some((r) => allowedRoles.includes(r))
    ) {
        return (
            <Navigate
                to="/inicio"
                replace
            />
        );
    }

    return <Outlet />;
}