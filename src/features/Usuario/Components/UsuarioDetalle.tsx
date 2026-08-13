
"use client";

import { ArrowLeft, Mail, Phone, User, MapPin, Briefcase, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsuarioType } from "../Schema/UsuarioSchema";

interface UsuarioDetalleProps {
    usuario: UsuarioType;
    onBack: () => void;
}

export function UsuarioDetalle({
    usuario,
    onBack,
}: UsuarioDetalleProps) {
    return (
        <div className="space-y-6">
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
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            {usuario.nombre}{" "}
                            {usuario.apellido_paterno}{" "}
                            {usuario.apellido_materno ?? ""}
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
                        <div className="flex gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Nombre completo
                                </p>

                                <p className="font-medium">
                                    {usuario.nombre}{" "}
                                    {usuario.apellido_paterno}{" "}
                                    {usuario.apellido_materno ?? ""}
                                </p>
                            </div>
                        </div>

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

                        <div className="flex gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Teléfono
                                </p>

                                <p className="font-medium">
                                    {usuario.telefono || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <IdCard className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Documento
                                </p>

                                <p className="font-medium">
                                    {usuario.tipo_documento_identidad}{" "}
                                    {usuario.numero_documento}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ciudad
                                </p>

                                <p className="font-medium">
                                    {usuario.ciudad || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    País
                                </p>

                                <p className="font-medium">
                                    {usuario.pais || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ocupación
                                </p>

                                <p className="font-medium">
                                    {usuario.ocupacion || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Contacto de emergencia
                                </p>

                                <p className="font-medium">
                                    {usuario.contacto_emergencia_nombre || "-"}
                                </p>

                                {usuario.contacto_emergencia_telefono && (
                                    <p className="text-sm text-muted-foreground">
                                        {usuario.contacto_emergencia_telefono}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Información adicional</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                ID de usuario
                            </p>

                            <p className="font-mono text-sm mt-1 break-all">
                                {usuario.id_usuario}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Fecha de creación
                            </p>

                            <p className="font-medium mt-1">
                                {usuario.created_at
                                    ? new Date(
                                        usuario.created_at
                                    ).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Última actualización
                            </p>

                            <p className="font-medium mt-1">
                                {usuario.updated_at
                                    ? new Date(
                                        usuario.updated_at
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