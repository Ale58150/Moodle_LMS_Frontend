"use client";

import { useNavigate, useParams } from "react-router-dom";
import { AppTitle } from "@/components/common/Apptittle";
import { UsuarioDetalle } from "@/features/Usuario/Components/UsuarioDetalle";
import { useGetUser } from "@/features/Usuario/Hook/UsuarioHook";

export default function UsuarioDetallePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const {
        data,
        isLoading,
        isError,
    } = useGetUser(id ?? "", !!id);

    if (!id) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuario" />

                <div className="text-red-500">
                    ID de usuario no válido.
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuario" />

                <div className="text-muted-foreground">
                    Cargando información del usuario...
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="space-y-6">
                <AppTitle title="Usuario" />

                <div className="text-red-500">
                    No se pudo cargar la información del usuario.
                </div>
            </div>
        );
    }

    return (
        <UsuarioDetalle
            usuario={data}
            onBack={() => navigate("/usuario")}
        />
    );
}