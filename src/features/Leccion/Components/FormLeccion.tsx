"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
    LeccionCreateSchema,
    LeccionCreateType,
    LeccionUpdateSchema,
    LeccionUpdateType,
    LeccionDetailType,
} from "../Schema/LeccionSchema";
import { useCreateLeccion, useGetLecciones, useUpdateLeccion } from "../Hook/LeccionHook";
import { RichTextEditor } from "@/components/common/RichTextEditor";
import { useEffect } from "react";

type FormValues = LeccionCreateType | LeccionUpdateType;

type FormLeccionProps = {
    initialData?: LeccionDetailType;
    mode: "create" | "edit";
    moduloId: string;
    onSuccess?: () => void;
};

export function FormLeccion({ initialData, mode, moduloId, onSuccess }: FormLeccionProps) {
    const { data: leccionesExistentes } = useGetLecciones(moduloId);
    const { mutate: createLeccion, isPending: creating } = useCreateLeccion();
    const { mutate: updateLeccion, isPending: updating } = useUpdateLeccion();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(mode === "edit" ? LeccionUpdateSchema : LeccionCreateSchema),
        defaultValues:
            mode === "edit"
                ? {
                    nombre: initialData?.nombre ?? "",
                    descripcion: initialData?.descripcion ?? "",
                    contenidoHtml: initialData?.contenidoHtml ?? "",
                    tipoLeccion: initialData?.tipoLeccion ?? "video",
                    urlVideo: initialData?.urlVideo ?? "",
                    proveedorVideo: initialData?.proveedorVideo ?? "",
                    orden: initialData?.orden ?? 0,
                    esVistaPrevia: initialData?.esVistaPrevia ?? false,
                    requiereLeccionAnteriorCompletada: initialData?.requiereLeccionAnteriorCompletada ?? true,
                    estaPublicada: initialData?.estaPublicada ?? true,
                }
                : {
                    moduloId,
                    nombre: "",
                    descripcion: "",
                    contenidoHtml: "",
                    tipoLeccion: "video",
                    urlVideo: "",
                    proveedorVideo: "",
                    orden: 0,
                    esVistaPrevia: false,
                    requiereLeccionAnteriorCompletada: true,
                    estaPublicada: true,
                },
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "edit") {
            updateLeccion({ id: initialData!.id, data: values }, { onSuccess: () => onSuccess?.() });
            return;
        }

        createLeccion(
            { ...values, moduloId } as LeccionCreateType,
            { onSuccess: () => { form.reset(); onSuccess?.(); } },
        );
    };

    useEffect(() => {
        if (mode === "create" && leccionesExistentes && !form.formState.dirtyFields.orden) {
            form.setValue("orden", leccionesExistentes.length + 1);
        }
    }, [mode, leccionesExistentes]);


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
                <Controller
                    name="nombre"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nombre</FieldLabel>
                            <Input {...field} value={field.value ?? ""} placeholder="Ej: Presente simple" />
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
                            <Textarea {...field} value={field.value ?? ""} placeholder="Descripción breve" rows={2} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="contenidoHtml"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Contenido</FieldLabel>
                            <RichTextEditor value={field.value ?? ""} onChange={field.onChange} />
                        </Field>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="tipoLeccion"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Tipo</FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="lectura">Lectura</SelectItem>
                                        <SelectItem value="html">HTML</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    min={1}
                                    value={field.value ?? 1}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Si eliges una posición ya ocupada, las demás lecciones se recorren automáticamente.
                                </p>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Controller
                        name="urlVideo"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>URL del video</FieldLabel>
                                <Input {...field} value={field.value ?? ""} placeholder="https://..." />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="proveedorVideo"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Proveedor de video</FieldLabel>
                                <Input {...field} value={field.value ?? ""} placeholder="Ej: YouTube, Vimeo" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Controller
                        name="esVistaPrevia"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Vista previa</FieldLabel>
                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={field.value ?? false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-border"
                                    />
                                    Visible sin inscripción
                                </label>
                            </Field>
                        )}
                    />

                    <Controller
                        name="requiereLeccionAnteriorCompletada"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Secuencial</FieldLabel>
                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={field.value ?? true}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-border"
                                    />
                                    Requiere anterior
                                </label>
                            </Field>
                        )}
                    />

                    <Controller
                        name="estaPublicada"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Publicada</FieldLabel>
                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={field.value ?? true}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-border"
                                    />
                                    Visible a estudiantes
                                </label>
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                    ? mode === "edit" ? "Guardando..." : "Creando..."
                    : mode === "edit" ? "Guardar cambios" : "Crear lección"}
            </Button>
        </form>
    );
}