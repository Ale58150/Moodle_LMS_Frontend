"use client";

import { useState } from "react";
import {
    ArrowLeft,
    Mail,
    Phone,
    User,
    MapPin,
    Briefcase,
    IdCard,
    Shield,
    Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { UsuarioDetailType } from "../Schema/UsuarioSchema";
import { FormUsuario } from "./FormUsuario";
import { AppTitle } from "@/components/common/Apptittle";

interface UsuarioDetalleProps {
    usuario: UsuarioDetailType;
    onBack: () => void;
}

export function UsuarioDetalle({
    usuario,
    onBack,
}: UsuarioDetalleProps) {
    const [openEdit, setOpenEdit] = useState(false);

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
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <div>
                        <AppTitle title="Detalle del usuario" subtitle="Información completa del usuario" />
                    </div>
                </div>

                <Button onClick={() => setOpenEdit(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                </Button>
            </div>

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
                                    {perfil?.telefono || "-"}
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
                                    {[
                                        perfil?.tipoDocumentoIdentidad,
                                        perfil?.numeroDocumento,
                                    ]
                                        .filter(Boolean)
                                        .join(" ") || "-"}
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
                                    {perfil?.ciudad || "-"}
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
                                    {perfil?.pais || "-"}
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
                                    {perfil?.ocupacion || "-"}
                                </p>
                            </div>
                        </div>

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

            <Card>
                <CardHeader>
                    <CardTitle>
                        Información adicional
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                ID de usuario
                            </p>

                            <p className="font-mono text-sm mt-1 break-all">
                                {usuario.id}
                            </p>
                        </div>

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
            <Dialog
                open={openEdit}
                onOpenChange={setOpenEdit}
            >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Editar usuario
                        </DialogTitle>
                    </DialogHeader>

                    <FormUsuario
                        mode="edit"
                        initialData={usuario}
                        onSuccess={() => {
                            setOpenEdit(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}