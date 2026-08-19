import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    useDeleteFormulario,
    useAddPregunta,
    useUpdatePregunta,
    useDeletePregunta,
    useAddOpcion,
    useUpdateOpcion,
    useDeleteOpcion,
} from "../Hook/FormularioHook";
import { FormularioAdminType } from "../Schema/FormularioSchema";

interface FormularioEditorProps {
    leccionId: string;
    formulario: FormularioAdminType;
}

export function FormularioEditor({ leccionId, formulario }: FormularioEditorProps) {
    const { mutate: eliminarFormulario } = useDeleteFormulario(leccionId);
    const { mutate: agregarPregunta } = useAddPregunta(leccionId);
    const { mutate: actualizarPregunta } = useUpdatePregunta(leccionId);
    const { mutate: eliminarPregunta } = useDeletePregunta(leccionId);
    const { mutate: agregarOpcion } = useAddOpcion(leccionId);
    const { mutate: actualizarOpcion } = useUpdateOpcion(leccionId);
    const { mutate: eliminarOpcion } = useDeleteOpcion(leccionId);

    const [nuevaPreguntaTexto, setNuevaPreguntaTexto] = useState("");

    const handleAgregarPregunta = () => {
        if (!nuevaPreguntaTexto.trim()) return;

        agregarPregunta(
            {
                formularioId: formulario.id,
                data: {
                    enunciado: nuevaPreguntaTexto,
                    opciones: [
                        { texto: "Opción 1", esCorrecta: true },
                        { texto: "Opción 2", esCorrecta: false },
                    ],
                },
            },
            { onSuccess: () => setNuevaPreguntaTexto("") },
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{formulario.titulo}</p>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => {
                        if (confirm("¿Eliminar todo el checkpoint de esta lección?")) {
                            eliminarFormulario(formulario.id);
                        }
                    }}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    Eliminar checkpoint
                </Button>
            </div>

            <div className="space-y-4">
                {formulario.preguntas.map((pregunta, pIndex) => (
                    <div key={pregunta.id} className="space-y-2 rounded-md border bg-background p-3">
                        <div className="flex items-center gap-2">
                            <Input
                                defaultValue={pregunta.enunciado}
                                onBlur={(e) => {
                                    if (e.target.value !== pregunta.enunciado) {
                                        actualizarPregunta({ id: pregunta.id, data: { enunciado: e.target.value } });
                                    }
                                }}
                                placeholder={`Pregunta ${pIndex + 1}`}
                                className="h-8 text-sm"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => eliminarPregunta(pregunta.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <div className="space-y-1.5 pl-1">
                            {pregunta.opciones.map((opcion) => (
                                <div key={opcion.id} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={`correcta-${pregunta.id}`}
                                        checked={opcion.esCorrecta}
                                        onChange={() =>
                                            actualizarOpcion({ id: opcion.id, data: { esCorrecta: true } })
                                        }
                                        className="h-4 w-4 shrink-0"
                                        title="Marcar como correcta"
                                    />

                                    <Input
                                        defaultValue={opcion.texto}
                                        onBlur={(e) => {
                                            if (e.target.value !== opcion.texto) {
                                                actualizarOpcion({ id: opcion.id, data: { texto: e.target.value } });
                                            }
                                        }}
                                        className="h-8 text-sm"
                                    />

                                    {pregunta.opciones.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                                            onClick={() => eliminarOpcion(opcion.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1 text-xs text-muted-foreground"
                                onClick={() =>
                                    agregarOpcion({ preguntaId: pregunta.id, data: { texto: "Nueva opción" } })
                                }
                            >
                                <Plus className="h-3 w-3" />
                                Agregar opción
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 border-t pt-3">
                <Input
                    value={nuevaPreguntaTexto}
                    onChange={(e) => setNuevaPreguntaTexto(e.target.value)}
                    placeholder="Nueva pregunta..."
                    className="h-9 text-sm"
                />
                <Button type="button" size="sm" onClick={handleAgregarPregunta} disabled={!nuevaPreguntaTexto.trim()}>
                    Agregar
                </Button>
            </div>
        </div>
    );
}