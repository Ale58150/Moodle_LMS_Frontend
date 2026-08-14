import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";
import {
    CrearInscripcionSchema,
    CrearInscripcionSchemaType,
} from "../Schema/InscripcionSchema";
import {
    useCrearInscripcion,
    useCursos,
    useModulosPorCurso,
    useEstudiantes,
} from "../Hook/InscripcionHook";

export function CrearInscripcionForm() {
    const [cursoSeleccionado, setCursoSeleccionado] = useState<string | null>(null);

    const crearInscripcionMutation = useCrearInscripcion();
    const { data: cursos, isLoading: loadingCursos } = useCursos();
    const { data: modulos, isLoading: loadingModulos } = useModulosPorCurso(cursoSeleccionado);
    const { data: estudiantes, isLoading: loadingEstudiantes } = useEstudiantes();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CrearInscripcionSchemaType>({
        resolver: zodResolver(CrearInscripcionSchema),
        defaultValues: {
            estadoAcceso: "pendiente",
        },
    });

    const onSubmit = (data: CrearInscripcionSchemaType) => {
        crearInscripcionMutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Crear Inscripción</CardTitle>
                    <CardDescription>
                        Ingresa los datos para crear una inscripción
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-3">

                            <Field>
                                <FieldLabel htmlFor="cursoId">Curso</FieldLabel>
                                <Controller
                                    name="cursoId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={cursos?.find(
                                                (curso: any) => curso.id === field.value
                                            )}
                                            options={cursos?.map((curso: any) => ({
                                                value: curso.id,
                                                label: curso.nombre,
                                            }))}
                                            isLoading={loadingCursos}
                                            placeholder="Selecciona un curso"
                                        />
                                    )}
                                />
                                {errors.cursoId && (
                                    <span className="text-sm text-red-500">
                                        {errors.cursoId.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="moduloId">Módulo</FieldLabel>
                                <Controller
                                    name="moduloId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={modulos?.find(
                                                (modulo: any) => modulo.id === field.value
                                            )}
                                            options={modulos?.map((modulo: any) => ({
                                                value: modulo.id,
                                                label: modulo.nombre,
                                            }))}
                                            isLoading={loadingModulos}
                                            placeholder="Selecciona un módulo"
                                            isDisabled={!cursoSeleccionado}
                                        />
                                    )}
                                />
                                {errors.moduloId && (
                                    <span className="text-sm text-red-500">
                                        {errors.moduloId.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="estudianteId">Estudiante</FieldLabel>
                                <div className="flex gap-2">
                                    <Controller
                                        name="estudianteId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={estudiantes?.find(
                                                    (estudiante: any) => estudiante.id === field.value
                                                )}
                                                options={estudiantes?.map((estudiante: any) => ({
                                                    value: estudiante.id,
                                                    label: estudiante.username,
                                                }))}
                                                isLoading={loadingEstudiantes}
                                                isMulti
                                                placeholder="Selecciona un estudiante"
                                            />
                                        )}
                                    />
                                    <Button type="button" variant="outline" size="icon">
                                        <Plus className="size-4" />
                                    </Button>
                                </div>
                                {errors.estudianteId && (
                                    <span className="text-sm text-red-500">
                                        {errors.estudianteId.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={crearInscripcionMutation.isPending}
                                >
                                    {crearInscripcionMutation.isPending
                                        ? "Creando..."
                                        : "Crear Inscripción"}
                                </Button>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
