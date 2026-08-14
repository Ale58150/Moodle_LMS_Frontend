"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    CursoCreateSchema,
    CursoCreateType,
    CursoUpdateSchema,
    CursoUpdateType,
    CursoType,
} from "../Schema/CursoSchema";

import {
    useCreateCurso,
    useUpdateCurso,
} from "../Hook/CursoHook";

type FormValues = CursoCreateType | CursoUpdateType;

type FormCursoProps = {
    initialData?: CursoType;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

export function FormCurso({
    initialData,
    mode,
    onSuccess,
}: FormCursoProps) {
    const { usuario } = useAuthStore();
    const {
        mutate: createCurso,
        isPending: creating,
    } = useCreateCurso();

    const {
        mutate: updateCurso,
        isPending: updating,
    } = useUpdateCurso();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit"
                ? CursoUpdateSchema
                : CursoCreateSchema
        ),

        defaultValues:
            mode === "edit"
                ? {
                    nombre: initialData?.nombre ?? "",
                    categoria: initialData?.categoria ?? "",
                    slug: initialData?.slug ?? "",
                    descripcionCorta:
                        initialData?.descripcionCorta ?? "",
                    descripcionCompleta:
                        initialData?.descripcionCompleta ?? "",
                    duracionHoras:
                        initialData?.duracionHoras ?? undefined,
                    rutaPortada:
                        initialData?.rutaPortada ?? "",
                    rutaImagenSecundaria:
                        initialData?.rutaImagenSecundaria ?? "",
                    estado:
                        initialData?.estado ?? "publicado",
                    creadoPor: usuario?.id ?? ""
                }
                : {
                    nombre: "",
                    categoria: "",
                    slug: "",
                    descripcionCorta: "",
                    descripcionCompleta: "",
                    duracionHoras: undefined,
                    rutaPortada: "",
                    rutaImagenSecundaria: "",
                    estado: "publicado",
                    creadoPor: "",
                },
    });

    const onSubmit = (values: FormValues) => {
        const data = {
            ...values,
            creadoPor: usuario?.id ?? "",
        };

        if (mode === "edit") {
            updateCurso(
                {
                    id: initialData!.id,
                    data: data as CursoUpdateType,
                },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                }
            );

            return;
        }

        createCurso(data as CursoCreateType, {
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
                            <Field
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>
                                    Nombre del curso
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: Maquillaje Profesional"
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
                        name="categoria"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>
                                    Categoría
                                </FieldLabel>

                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ej: Maquillaje"
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

                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>
                                Slug
                            </FieldLabel>

                            <Input
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Ej: maquillaje-profesional"
                            />

                            <p className="text-xs text-muted-foreground">
                                Identificador utilizado para la URL del curso.
                            </p>

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
                    name="descripcionCorta"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>
                                Descripción corta
                            </FieldLabel>

                            <Textarea
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Escribe una breve descripción del curso..."
                                rows={3}
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
                    name="descripcionCompleta"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>
                                Descripción completa
                            </FieldLabel>

                            <Textarea
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Describe detalladamente el contenido del curso..."
                                rows={6}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Controller
                        name="duracionHoras"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>
                                    Duración en horas
                                </FieldLabel>

                                <Input
                                    type="number"
                                    min="1"
                                    value={
                                        field.value ?? ""
                                    }
                                    onChange={(event) => {
                                        const value =
                                            event.target.value;

                                        field.onChange(
                                            value === ""
                                                ? undefined
                                                : Number(value)
                                        );
                                    }}
                                    placeholder="Ej: 20"
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
                        name="estado"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>
                                    Estado
                                </FieldLabel>

                                <Select
                                    value={
                                        field.value ?? ""
                                    }
                                    onValueChange={
                                        field.onChange
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="publicado">
                                            Publicado
                                        </SelectItem>

                                        <SelectItem value="borrador">
                                            Borrador
                                        </SelectItem>

                                        <SelectItem value="inactivo">
                                            Inactivo
                                        </SelectItem>
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

                </div>

                <Controller
                    name="rutaPortada"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>
                                Imagen de portada
                            </FieldLabel>

                            <Input
                                {...field}
                                value={field.value ?? ""}
                                placeholder="/uploads/cursos/curso.jpg"
                            />

                            <p className="text-xs text-muted-foreground">
                                Ruta de la imagen principal del curso.
                            </p>

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
                    name="rutaImagenSecundaria"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>
                                Imagen secundaria
                            </FieldLabel>

                            <Input
                                {...field}
                                value={field.value ?? ""}
                                placeholder="/uploads/cursos/curso-secundaria.jpg"
                            />

                            <p className="text-xs text-muted-foreground">
                                Ruta de una imagen adicional para el curso.
                            </p>

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
                        : "Crear curso"}
            </Button>
        </form>
    );
}