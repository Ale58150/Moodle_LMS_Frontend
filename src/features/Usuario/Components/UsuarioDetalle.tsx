"use client";

import {
    ArrowLeft,
    Mail,
    Phone,
    User,
    MapPin,
    Briefcase,
    IdCard,
    Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { UsuarioDetailType } from "../Schema/UsuarioSchema";

interface UsuarioDetalleProps {
    usuario: UsuarioDetailType;
    onBack: () => void;
}

export function UsuarioDetalle({
    usuario,
    onBack,
}: UsuarioDetalleProps) {
    const perfil = usuario.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    const rol = usuario.roles?.[0]?.rol?.nombre ?? "-";

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onBack}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>

                <div>
                    <h1 className="text-2xl font-semibold">
                        Detalle del usuario
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Información completa del usuario
                    </p>
                </div>
            </div>

            {/* INFORMACIÓN PRINCIPAL */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            {nombreCompleto || usuario.username}
                        </CardTitle>

                        <p className="text-sm text-muted-foreground mt-1">
                            {usuario.correo}
                        </p>
                    </div>

                    <Badge
                        variant={
                            usuario.estado.toLowerCase() === "activo"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {usuario.estado}
                    </Badge>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* NOMBRE */}
                        <div className="flex gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Nombre completo
                                </p>

                                <p className="font-medium">
                                    {nombreCompleto || "-"}
                                </p>
                            </div>
                        </div>

                        {/* USERNAME */}
                        <div className="flex gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Usuario
                                </p>

                                <p className="font-medium">
                                    {usuario.username}
                                </p>
                            </div>
                        </div>

                        {/* CORREO */}
                        <div className="flex gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Correo
                                </p>

                                <p className="font-medium">
                                    {usuario.correo}
                                </p>
                            </div>
                        </div>

                        {/* TELÉFONO */}
                        <div className="flex gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Teléfono
                                </p>

                                <p className="font-medium">
                                    {perfil?.telefono || "-"}
                                </p>
                            </div>
                        </div>

                        {/* DOCUMENTO */}
                        <div className="flex gap-3">
                            <IdCard className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Documento
                                </p>

                                <p className="font-medium">
                                    {[
                                        perfil?.tipoDocumentoIdentidad,
                                        perfil?.numeroDocumento,
                                    ]
                                        .filter(Boolean)
                                        .join(" ") || "-"}
                                </p>
                            </div>
                        </div>

                        {/* CIUDAD */}
                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ciudad
                                </p>

                                <p className="font-medium">
                                    {perfil?.ciudad || "-"}
                                </p>
                            </div>
                        </div>

                        {/* PAÍS */}
                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    País
                                </p>

                                <p className="font-medium">
                                    {perfil?.pais || "-"}
                                </p>
                            </div>
                        </div>

                        {/* OCUPACIÓN */}
                        <div className="flex gap-3">
                            <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ocupación
                                </p>

                                <p className="font-medium">
                                    {perfil?.ocupacion || "-"}
                                </p>
                            </div>
                        </div>

                        {/* ROL */}
                        <div className="flex gap-3">
                            <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Rol
                                </p>

                                <p className="font-medium">
                                    {rol}
                                </p>
                            </div>
                        </div>

                        {/* CONTACTO EMERGENCIA */}
                        <div className="flex gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Contacto de emergencia
                                </p>

                                <p className="font-medium">
                                    {perfil?.contactoEmergenciaNombre || "-"}
                                </p>

                                {perfil?.contactoEmergenciaTelefono && (
                                    <p className="text-sm text-muted-foreground">
                                        {perfil.contactoEmergenciaTelefono}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* INFORMACIÓN ADICIONAL */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Información adicional
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* ID */}
                        <div>
                            <p className="text-sm text-muted-foreground">
                                ID de usuario
                            </p>

                            <p className="font-mono text-sm mt-1 break-all">
                                {usuario.id}
                            </p>
                        </div>

                        {/* FECHA CREACIÓN */}
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Fecha de creación
                            </p>

                            <p className="font-medium mt-1">
                                {usuario.createdAt
                                    ? new Date(
                                        usuario.createdAt
                                    ).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>

                        {/* ACTUALIZACIÓN */}
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Última actualización
                            </p>

                            <p className="font-medium mt-1">
                                {usuario.updatedAt
                                    ? new Date(
                                        usuario.updatedAt
                                    ).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}