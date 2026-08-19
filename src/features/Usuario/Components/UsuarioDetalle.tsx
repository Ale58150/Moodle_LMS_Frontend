"use client";

import { useState } from "react";
import {
    ArrowLeft,
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
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";


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
                    <InfoSection
                        title="Información personal"
                        subtitle="Datos personales y de contacto del usuario"
                        withDivider={false}
                    >
                        <InfoField
                            label="Nombre completo"
                            value={nombreCompleto || "-"}
                        />

                        <InfoField
                            label="Usuario"
                            value={usuario.username}
                        />

                        <InfoField
                            label="Correo"
                            value={usuario.correo}
                        />

                        <InfoField
                            label="Teléfono"
                            value={perfil?.telefono || "-"}
                        />

                        <InfoField
                            label="Documento"
                            value={
                                [
                                    perfil?.tipoDocumentoIdentidad,
                                    perfil?.numeroDocumento,
                                ]
                                    .filter(Boolean)
                                    .join(" ") || "-"
                            }
                        />

                        <InfoField
                            label="Ciudad"
                            value={perfil?.ciudad || "-"}
                        />

                        <InfoField
                            label="País"
                            value={perfil?.pais || "-"}
                        />

                        <InfoField
                            label="Ocupación"
                            value={perfil?.ocupacion || "-"}
                        />

                        <InfoField
                            label="Rol"
                            value={rol}
                        />

                        <InfoField
                            label="Contacto de emergencia"
                            value={
                                <div>
                                    <p>
                                        {perfil?.contactoEmergenciaNombre || "-"}
                                    </p>

                                    {perfil?.contactoEmergenciaTelefono && (
                                        <p className="text-sm text-muted-foreground">
                                            {perfil.contactoEmergenciaTelefono}
                                        </p>
                                    )}
                                </div>
                            }
                        />
                    </InfoSection>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <InfoSection
                        title="Información adicional"
                        subtitle="Información técnica y de registro del usuario"
                        withDivider={false}
                    >
                        <InfoField
                            label="ID de usuario"
                            value={usuario.id}
                            valueClassName="mt-1 break-all font-mono text-sm text-neutral-900 dark:text-neutral-200"
                        />

                        <InfoField
                            label="Fecha de creación"
                            value={
                                usuario.createdAt
                                    ? new Date(
                                        usuario.createdAt
                                    ).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <InfoField
                            label="Última actualización"
                            value={
                                usuario.updatedAt
                                    ? new Date(
                                        usuario.updatedAt
                                    ).toLocaleDateString()
                                    : "-"
                            }
                        />
                    </InfoSection>
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