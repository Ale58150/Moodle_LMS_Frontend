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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    ModuloCreateSchema,
    ModuloCreateType,
    ModuloUpdateSchema,
    ModuloUpdateType,
    ModuloDetailType,
} from "../Schema/ModuloSchema";
import { useCreateModulo, useUpdateModulo } from "../Hook/ModuloHook";

type FormValues = ModuloCreateType | ModuloUpdateType;

type FormModuloProps = {
    initialData?: ModuloDetailType;
    mode: "create" | "edit";
    cursoId: string;
    onSuccess?: () => void;
};

export function FormModulo({
    initialData,
    mode,
    cursoId,
    onSuccess,
}: FormModuloProps) {
    const { mutate: createModulo, isPending: creating } = useCreateModulo();
    const { mutate: updateModulo, isPending: updating } = useUpdateModulo();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(mode === "edit" ? ModuloUpdateSchema : ModuloCreateSchema),
        defaultValues:
            mode === "edit"
                ? {
                    nombre: initialData?.nombre ?? "",
                    descripcion: initialData?.descripcion ?? "",
                    fraseMotivacional: initialData?.fraseMotivacional ?? "",
                    rutaImagen: initialData?.rutaImagen ?? "",
                    orden: initialData?.orden ?? 0,
                    otorgaCertificacion: initialData?.otorgaCertificacion ?? false,
                    estaPublicado: initialData?.estaPublicado ?? true,
                }
                : {
                    cursoId,
                    nombre: "",
                    descripcion: "",
                    fraseMotivacional: "",
                    rutaImagen: "",
                    orden: 0,
                    otorgaCertificacion: false,
                    estaPublicado: true,
                },
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "edit") {
            updateModulo(
                { id: initialData!.id, data: values },
                { onSuccess: () => onSuccess?.() },
            );
            return;
        }

        createModulo(
            { ...values, cursoId } as ModuloCreateType,
            {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                },
            },
        );
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
                <Controller
                    name="nombre"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nombre</FieldLabel>
                            <Input {...field} value={field.value ?? ""} placeholder="Ej: Inglés A2" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="fraseMotivacional"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Frase motivacional</FieldLabel>
                            <Input {...field} value={field.value ?? ""} placeholder="Ej: ¡Ya casi dominas el idioma!" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="descripcion"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Descripción</FieldLabel>
                            <Textarea {...field} value={field.value ?? ""} placeholder="Descripción del módulo" rows={3} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="rutaImagen"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Imagen (URL)</FieldLabel>
                                <Input {...field} value={field.value ?? ""} placeholder="https://..." />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="orden"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Orden</FieldLabel>
                                <Input
                                    type="number"
                                    min={0}
                                    value={field.value ?? 0}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="otorgaCertificacion"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Otorga certificación</FieldLabel>
                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={field.value ?? false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-border"
                                    />
                                    El módulo emite certificado propio
                                </label>
                            </Field>
                        )}
                    />

                    <Controller
                        name="estaPublicado"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Publicado</FieldLabel>
                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={field.value ?? true}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-border"
                                    />
                                    Visible para estudiantes
                                </label>
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                    ? mode === "edit" ? "Guardando..." : "Creando..."
                    : mode === "edit" ? "Guardar cambios" : "Crear módulo"}
            </Button>
        </form>
    );
}