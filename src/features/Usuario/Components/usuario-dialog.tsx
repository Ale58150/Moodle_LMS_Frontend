"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    UserCreateSchema,
    UserCreateType,
    UsuarioType,
} from "../Schema/UsuarioSchema";

import {
    useCreateUser,
    useUpdateUser,
} from "../Hook/UsuarioHook";

interface UsuarioDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    usuario?: UsuarioType | null;
}

export function UsuarioDialog({
    open,
    onOpenChange,
    usuario,
}: UsuarioDialogProps) {
    const isEditing = !!usuario;

    const createUser = useCreateUser();
    const updateUser = useUpdateUser();

    const form = useForm<UserCreateType>({
        resolver: zodResolver(UserCreateSchema),
        defaultValues: {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            correo: "",
            tipo_documento_identidad: "",
            numero_documento: "",
            telefono: "",
            ciudad: "",
            pais: "",
            ocupacion: "",
            contacto_emergencia_nombre: "",
            contacto_emergencia_telefono: "",
            rol: "estudiante",
        },
    });

    useEffect(() => {
        if (usuario) {
            form.reset({
                nombre: usuario.nombre,
                apellido_paterno: usuario.apellido_paterno,
                apellido_materno: usuario.apellido_materno ?? "",
                correo: usuario.correo,
                tipo_documento_identidad:
                    usuario.tipo_documento_identidad,
                numero_documento: usuario.numero_documento,
                telefono: usuario.telefono ?? "",
                ciudad: usuario.ciudad ?? "",
                pais: usuario.pais ?? "",
                ocupacion: usuario.ocupacion ?? "",
                contacto_emergencia_nombre:
                    usuario.contacto_emergencia_nombre ?? "",
                contacto_emergencia_telefono:
                    usuario.contacto_emergencia_telefono ?? "",
                rol: "estudiante",
            });
        } else {
            form.reset({
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
                correo: "",
                tipo_documento_identidad: "",
                numero_documento: "",
                telefono: "",
                ciudad: "",
                pais: "",
                ocupacion: "",
                contacto_emergencia_nombre: "",
                contacto_emergencia_telefono: "",
                rol: "estudiante",
            });
        }
    }, [usuario, open]);

    const onSubmit = (data: UserCreateType) => {
        if (isEditing && usuario) {
            updateUser.mutate(
                {
                    id: usuario.id_usuario,
                    data,
                },
                {
                    onSuccess: () => {
                        onOpenChange(false);
                    },
                }
            );

            return;
        }

        createUser.mutate(data, {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
            },
        });
    };

    const isPending =
        createUser.isPending || updateUser.isPending;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing
                                ? "Editar usuario"
                                : "Nuevo usuario"}
                        </DialogTitle>

                        <DialogDescription>
                            {isEditing
                                ? "Modifica los datos del usuario."
                                : "Completa los datos para crear un nuevo usuario."}
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="py-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field>
                                <Label htmlFor="nombre">
                                    Nombre
                                </Label>

                                <Input
                                    id="nombre"
                                    {...form.register("nombre")}
                                />

                                {form.formState.errors.nombre && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState
                                                .errors.nombre
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="apellido_paterno">
                                    Apellido paterno
                                </Label>

                                <Input
                                    id="apellido_paterno"
                                    {...form.register(
                                        "apellido_paterno"
                                    )}
                                />

                                {form.formState.errors
                                    .apellido_paterno && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState
                                                    .errors
                                                    .apellido_paterno
                                                    .message
                                            }
                                        </p>
                                    )}
                            </Field>

                            <Field>
                                <Label htmlFor="apellido_materno">
                                    Apellido materno
                                </Label>

                                <Input
                                    id="apellido_materno"
                                    {...form.register(
                                        "apellido_materno"
                                    )}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="correo">
                                    Correo
                                </Label>

                                <Input
                                    id="correo"
                                    type="email"
                                    {...form.register("correo")}
                                />

                                {form.formState.errors.correo && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState
                                                .errors.correo
                                                .message
                                        }
                                    </p>
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="tipo_documento_identidad">
                                    Tipo de documento
                                </Label>

                                <Input
                                    id="tipo_documento_identidad"
                                    {...form.register(
                                        "tipo_documento_identidad"
                                    )}
                                    placeholder="CI"
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="numero_documento">
                                    Número de documento
                                </Label>

                                <Input
                                    id="numero_documento"
                                    {...form.register(
                                        "numero_documento"
                                    )}
                                />

                                {form.formState.errors
                                    .numero_documento && (
                                        <p className="text-sm text-red-500">
                                            {
                                                form.formState
                                                    .errors
                                                    .numero_documento
                                                    .message
                                            }
                                        </p>
                                    )}
                            </Field>

                            <Field>
                                <Label htmlFor="telefono">
                                    Teléfono
                                </Label>

                                <Input
                                    id="telefono"
                                    {...form.register("telefono")}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="ciudad">
                                    Ciudad
                                </Label>

                                <Input
                                    id="ciudad"
                                    {...form.register("ciudad")}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="pais">
                                    País
                                </Label>

                                <Input
                                    id="pais"
                                    {...form.register("pais")}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="ocupacion">
                                    Ocupación
                                </Label>

                                <Input
                                    id="ocupacion"
                                    {...form.register("ocupacion")}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="contacto_emergencia_nombre">
                                    Contacto de emergencia
                                </Label>

                                <Input
                                    id="contacto_emergencia_nombre"
                                    {...form.register(
                                        "contacto_emergencia_nombre"
                                    )}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="contacto_emergencia_telefono">
                                    Teléfono de emergencia
                                </Label>

                                <Input
                                    id="contacto_emergencia_telefono"
                                    {...form.register(
                                        "contacto_emergencia_telefono"
                                    )}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="rol">
                                    Rol
                                </Label>

                                <Select
                                    value={form.watch("rol")}
                                    onValueChange={(value) =>
                                        form.setValue(
                                            "rol",
                                            value as UserCreateType["rol"]
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="administrador">
                                            Administrador
                                        </SelectItem>

                                        <SelectItem value="docente">
                                            Docente
                                        </SelectItem>

                                        <SelectItem value="estudiante">
                                            Estudiante
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Guardando..."
                                : isEditing
                                    ? "Guardar cambios"
                                    : "Crear usuario"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}