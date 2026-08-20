import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateEstudiante } from "../Hook/EstudiantesHook";
import { Controller, useForm } from "react-hook-form";

interface FormEstudianteProps {
  initialData?: any;
  onSuccess: () => void;
}

export function FormEstudiante({
  initialData,
  onSuccess,
}: FormEstudianteProps) {
  const { mutate: createEstudiante, isPending: creating, } = useCreateEstudiante();
  const form = useForm<any>({
    defaultValues: initialData || {
      nombre: "",
      correo: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });

  const onSubmit = (values: any) => {
    createEstudiante(values, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="nombre"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                />
              </Field>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="apellidoPaterno"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Apellido Paterno</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                />
              </Field>
            )}
          />
          <Controller
            name="apellidoMaterno"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Apellido Materno</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                />
              </Field>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="correo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Correo electrónico</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  value={field.value ?? ""}
                />
              </Field>
            )}
          />
          <Controller
            name="numeroDocumento"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>CI</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                />
              </Field>
            )}
          />
        </div>
        <Field>
          <Button type="submit">Guardar</Button>
        </Field>
      </FieldGroup >
    </form >
  );
}