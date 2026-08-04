import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = useAuthStore((state) => state.token);
    const rol = useAuthStore((state) => state.rol);
    const usuario = useAuthStore((state) => state.usuario);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (usuario?.estado === "pendiente") {
        return <Navigate to="/cambiar-password" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(rol || "")) {
        return <Navigate to="/inicio" replace />;
    }

    return <Outlet />;
}
