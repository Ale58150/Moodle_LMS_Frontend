import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetFormularioLeccion, useMarcarLeccionCompletada } from "../Hook/LeccionHook";

interface LeccionCheckpointFormProps {
    leccionId: string;
    onCompletada?: () => void;
}

export function LeccionCheckpointForm({ leccionId, onCompletada }: LeccionCheckpointFormProps) {
    const { data: formulario, isLoading } = useGetFormularioLeccion(leccionId);
    const { mutate: completar, isPending } = useMarcarLeccionCompletada();

    const [respuestas, setRespuestas] = useState<Record<string, string>>({});

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Cargando checkpoint...</p>;
    }

    if (!formulario) {
        return (
            <Button
                type="button"
                onClick={() => completar({ id: leccionId }, { onSuccess: onCompletada })}
                disabled={isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Marcar como completada
            </Button>
        );
    }

    const todasRespondidas = formulario.preguntas.every((p) => respuestas[p.id]);

    const handleSubmit = () => {
        const payload = formulario.preguntas.map((p) => ({
            preguntaFormularioId: p.id,
            opcionFormularioId: respuestas[p.id],
        }));

        completar({ id: leccionId, respuestas: payload }, { onSuccess: onCompletada });
    };

    return (
        <div className="space-y-5 rounded-lg border bg-muted/10 p-4">
            <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">{formulario.titulo}</p>
            </div>

            {formulario.preguntas.map((pregunta, index) => (
                <div key={pregunta.id} className="space-y-2">
                    <p className="text-sm font-medium">
                        {index + 1}. {pregunta.enunciado}
                    </p>

                    <div className="space-y-1.5">
                        {pregunta.opciones.map((opcion) => (
                            <label
                                key={opcion.id}
                                className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                            >
                                <input
                                    type="radio"
                                    name={pregunta.id}
                                    value={opcion.id}
                                    checked={respuestas[pregunta.id] === opcion.id}
                                    onChange={() => setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcion.id }))}
                                    className="h-4 w-4"
                                />
                                {opcion.texto}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <Button
                type="button"
                onClick={handleSubmit}
                disabled={!todasRespondidas || isPending}
                className="w-full gap-2 sm:w-auto"
            >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Enviar y completar lección
            </Button>
        </div>
    );
}