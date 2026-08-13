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
    UserUpdateSchema,
    UserUpdateType,
    UsuarioDetailType,
} from "../Schema/UsuarioSchema";
import {
    useCreateUser,
    useUpdateUser,
} from "../Hook/UsuarioHook";
import { useGetRoles } from "@/features/Roles/Hook/RolHook";

type FormValues = UserCreateType | UserUpdateType;

type FormUsuarioProps = {
    initialData?: UsuarioDetailType;
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

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit"
                ? UserUpdateSchema
                : UserCreateSchema
        ),
        defaultValues:
            mode === "edit"
                ? {
                    username: initialData?.username ?? "",
                    correo: initialData?.correo ?? "",
                    estado: initialData?.estado ?? "activo",
                    nombre: initialData?.perfil?.nombre ?? "",
                    apellidoPaterno:
                        initialData?.perfil?.apellidoPaterno ?? "",
                    apellidoMaterno:
                        initialData?.perfil?.apellidoMaterno ?? "",
                    telefono:
                        initialData?.perfil?.telefono ?? "",
                    tipoDocumentoIdentidad:
                        initialData?.perfil?.tipoDocumentoIdentidad ?? "",
                    numeroDocumento:
                        initialData?.perfil?.numeroDocumento ?? "",
                    fechaNacimiento:
                        initialData?.perfil?.fechaNacimiento ?? "",
                    genero:
                        initialData?.perfil?.genero ?? "",
                    ciudad:
                        initialData?.perfil?.ciudad ?? "",
                    pais:
                        initialData?.perfil?.pais ?? "",
                    ocupacion:
                        initialData?.perfil?.ocupacion ?? "",
                    contactoEmergenciaNombre:
                        initialData?.perfil?.contactoEmergenciaNombre ?? "",
                    contactoEmergenciaTelefono:
                        initialData?.perfil?.contactoEmergenciaTelefono ?? "",
                    fotografiaRuta:
                        initialData?.perfil?.fotografiaRuta ?? "",
                    rolId:
                        initialData?.roles?.[0]?.rolId ?? "",
                }
                : {
                    nombre: "",
                    apellidoPaterno: "",
                    apellidoMaterno: "",
                    correo: "",
                    numeroDocumento: "",
                    rolId: "",
                },
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "edit") {
            if (!("username" in values)) {
                return;
            }

            updateUser(
                {
                    id: initialData!.id,
                    data: values,
                },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                }
            );

            return;
        }

        if ("username" in values) {
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Nombre
                                </FieldLabel>
                                <Input
                                    {...field}
                                    value={field.value ?? ""}
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
                        name="apellidoPaterno"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Apellido paterno
                                </FieldLabel>
                                <Input
                                    {...field}
                                    value={field.value ?? ""}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="apellidoMaterno"
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
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name="numeroDocumento"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                Número de documento
                            </FieldLabel>
                            <Input
                                {...field}
                                value={field.value ?? ""}
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

                <Controller
                    name="rolId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
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
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                {mode === "edit" && (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Ej: juan.perez"
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
                                name="estado"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Estado
                                        </FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activo">
                                                    Activo
                                                </SelectItem>
                                                <SelectItem value="pendiente">
                                                    Pendiente
                                                </SelectItem>
                                                <SelectItem value="inactivo">
                                                    Inactivo
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
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Controller
                                name="tipoDocumentoIdentidad"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Tipo de documento
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
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
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                            <Controller
                                name="ciudad"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Ciudad
                                        </FieldLabel>
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
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Controller
                                name="pais"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            País
                                        </FieldLabel>
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

                            <Controller
                                name="fechaNacimiento"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Fecha de nacimiento
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="date"
                                            value={field.value ?? ""}
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

                        <Controller
                            name="genero"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Género
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Ej: Masculino"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Controller
                                name="contactoEmergenciaNombre"
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
                                name="contactoEmergenciaTelefono"
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