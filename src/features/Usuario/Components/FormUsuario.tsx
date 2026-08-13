"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    UserUpdateType,
    UsuarioType,
} from "../Schema/UsuarioSchema";

import {
    useCreateUser,
    useUpdateUser,
} from "../Hook/UsuarioHook";

type FormUsuarioProps = {
    initialData?: UsuarioType;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

export function FormUsuario({
    initialData,
    mode,
    onSuccess,
}: FormUsuarioProps) {
    const {
        mutate: createUser,
        isPending: creating,
    } = useCreateUser();

    const {
        mutate: updateUser,
        isPending: updating,
    } = useUpdateUser();

    const isPending = creating || updating;

    const form = useForm<UserCreateType>({
        resolver: zodResolver(UserCreateSchema),
        defaultValues: {
            nombre: initialData?.nombre ?? "",
            apellido_paterno:
                initialData?.apellido_paterno ?? "",
            apellido_materno:
                initialData?.apellido_materno ?? "",
            correo: initialData?.correo ?? "",
            tipo_documento_identidad:
                initialData?.tipo_documento_identidad ?? "",
            numero_documento:
                initialData?.numero_documento ?? "",
            telefono: initialData?.telefono ?? "",
            ciudad: initialData?.ciudad ?? "",
            pais: initialData?.pais ?? "",
            ocupacion:
                initialData?.ocupacion ?? "",
            contacto_emergencia_nombre:
                initialData?.contacto_emergencia_nombre ?? "",
            contacto_emergencia_telefono:
                initialData?.contacto_emergencia_telefono ?? "",
            rol: "estudiante",
        },
    });

    function onSubmit(values: UserCreateType) {
        if (mode === "edit" && initialData) {
            const data: UserUpdateType = values;

            updateUser(
                {
                    id: initialData.id_usuario,
                    data,
                },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                }
            );

            return;
        }

        createUser(values, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            },
        });
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                {/* Nombre y apellido paterno */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Nombre</FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: Juan"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="apellido_paterno"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Apellido paterno
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: Pérez"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Apellido materno y correo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="apellido_materno"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Apellido materno
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: García"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="correo"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Correo</FieldLabel>

                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Documento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="tipo_documento_identidad"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Tipo de documento
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: CI"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="numero_documento"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Número de documento
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: 12345678"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Teléfono y ocupación */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="telefono"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Teléfono
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: 70000000"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="ocupacion"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Ocupación
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: Docente"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Ciudad y país */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="ciudad"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Ciudad</FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: La Paz"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="pais"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>País</FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: Bolivia"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Contacto de emergencia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="contacto_emergencia_nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Contacto de emergencia
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Nombre completo"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="contacto_emergencia_telefono"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Teléfono de emergencia
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: 70000000"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Rol */}
                <Controller
                    name="rol"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Rol</FieldLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar rol" />
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

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending
                    ? mode === "edit"
                        ? "Guardando..."
                        : "Creando..."
                    : mode === "edit"
                        ? "Guardar cambios"
                        : "Crear usuario"}
            </Button>
        </form>
    );
}