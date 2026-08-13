"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Controller,
    SubmitHandler,
    useForm,
} from "react-hook-form";

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

import { useGetRoles } from "@/features/Roles/Hook/RolHook";

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

    const {
        data: roles,
        isLoading: loadingRoles,
    } = useGetRoles();

    const isPending = creating || updating;

    const form = useForm<UserCreateType>({
        resolver: zodResolver(UserCreateSchema),

        defaultValues: {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            correo: "",
            numeroDocumento: "",
            rolId: "",
        },
    });

    const onSubmit: SubmitHandler<UserCreateType> = (
        values
    ) => {
        if (mode === "edit" && initialData) {
            const data: UserUpdateType = values;

            updateUser(
                {
                    id: initialData.id,
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
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <FieldGroup>

                {/* ========================= */}
                {/* NOMBRE Y APELLIDO PATERNO */}
                {/* ========================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    Nombre
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: Juan"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="apellidoPaterno"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    Apellido paterno
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Ej: Pérez"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* ========================= */}
                {/* APELLIDO MATERNO Y CORREO */}
                {/* ========================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="apellidoMaterno"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    Apellido materno
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={
                                        field.value ?? ""
                                    }
                                    placeholder="Ej: García"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="correo"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    Correo
                                </FieldLabel>

                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                />

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* ========================= */}
                {/* DOCUMENTO */}
                {/* ========================= */}

                <Controller
                    name="numeroDocumento"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={
                                fieldState.invalid
                            }
                        >
                            <FieldLabel>
                                Número de documento
                            </FieldLabel>

                            <Input
                                {...field}
                                placeholder="Ej: 12345678"
                            />

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[
                                        fieldState.error,
                                    ]}
                                />
                            )}
                        </Field>
                    )}
                />

                {/* ========================= */}
                {/* ROL */}
                {/* ========================= */}

                <Controller
                    name="rolId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={
                                fieldState.invalid
                            }
                        >
                            <FieldLabel>
                                Rol
                            </FieldLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={loadingRoles}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            loadingRoles
                                                ? "Cargando roles..."
                                                : "Seleccionar rol"
                                        }
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {roles?.map((rol) => (
                                        <SelectItem
                                            key={rol.id}
                                            value={rol.id}
                                        >
                                            {rol.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[
                                        fieldState.error,
                                    ]}
                                />
                            )}
                        </Field>
                    )}
                />

                {/* ========================= */}
                {/* CAMPOS DE EDITAR */}
                {/* ========================= */}

                {mode === "edit" && (
                    <>
                        {/* Teléfono y ocupación */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="telefono"
                                control={form.control}
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            Teléfono
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Ej: 70000000"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="ocupacion"
                                control={form.control}
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            Ocupación
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Ej: Docente"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
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
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            Ciudad
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Ej: La Paz"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="pais"
                                control={form.control}
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            País
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Ej: Bolivia"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
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
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            Contacto de emergencia
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Nombre completo"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="contacto_emergencia_telefono"
                                control={form.control}
                                render={({
                                    field,
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={
                                            fieldState.invalid
                                        }
                                    >
                                        <FieldLabel>
                                            Teléfono de emergencia
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            value={
                                                field.value ??
                                                ""
                                            }
                                            placeholder="Ej: 70000000"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </>
                )}
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