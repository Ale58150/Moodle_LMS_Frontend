import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFormulario } from "../Hook/FormularioHook";
import { CreateFormularioType, CreatePreguntaType } from "../Schema/FormularioSchema";

interface FormularioBuilderProps {
    leccionId: string;
}

type PreguntaLocal = CreatePreguntaType & { _key: string };

function nuevaPregunta(): PreguntaLocal {
    return {
        _key: crypto.randomUUID(),
        enunciado: "",
        opciones: [
            { texto: "", esCorrecta: true },
            { texto: "", esCorrecta: false },
        ],
    };
}

export function FormularioBuilder({ leccionId }: FormularioBuilderProps) {
    const { mutate: crear, isPending } = useCreateFormulario(leccionId);

    const [titulo, setTitulo] = useState("");
    const [preguntas, setPreguntas] = useState<PreguntaLocal[]>([nuevaPregunta()]);

    const actualizarPregunta = (key: string, cambios: Partial<PreguntaLocal>) => {
        setPreguntas((prev) => prev.map((p) => (p._key === key ? { ...p, ...cambios } : p)));
    };

    const actualizarOpcion = (preguntaKey: string, index: number, texto: string) => {
        setPreguntas((prev) =>
            prev.map((p) =>
                p._key === preguntaKey
                    ? { ...p, opciones: p.opciones.map((o, i) => (i === index ? { ...o, texto } : o)) }
                    : p,
            ),
        );
    };

    const marcarCorrecta = (preguntaKey: string, index: number) => {
        setPreguntas((prev) =>
            prev.map((p) =>
                p._key === preguntaKey
                    ? { ...p, opciones: p.opciones.map((o, i) => ({ ...o, esCorrecta: i === index })) }
                    : p,
            ),
        );
    };

    const agregarOpcion = (preguntaKey: string) => {
        setPreguntas((prev) =>
            prev.map((p) =>
                p._key === preguntaKey ? { ...p, opciones: [...p.opciones, { texto: "", esCorrecta: false }] } : p,
            ),
        );
    };

    const quitarOpcion = (preguntaKey: string, index: number) => {
        setPreguntas((prev) =>
            prev.map((p) => {
                if (p._key !== preguntaKey || p.opciones.length <= 2) return p;
                const opciones = p.opciones.filter((_, i) => i !== index);
                if (!opciones.some((o) => o.esCorrecta)) opciones[0].esCorrecta = true;
                return { ...p, opciones };
            }),
        );
    };

    const agregarPregunta = () => setPreguntas((prev) => [...prev, nuevaPregunta()]);

    const quitarPregunta = (key: string) => {
        setPreguntas((prev) => (prev.length > 1 ? prev.filter((p) => p._key !== key) : prev));
    };

    const valido =
        titulo.trim().length > 0 &&
        preguntas.every((p) => p.enunciado.trim().length > 0 && p.opciones.every((o) => o.texto.trim().length > 0));

    const handleSubmit = () => {
        const payload: CreateFormularioType = {
            titulo,
            preguntas: preguntas.map(({ ...resto }) => resto),
        };
        crear(payload);
    };

    return (
        <div className="space-y-4">
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título del checkpoint" className="h-9" />

            <div className="space-y-4">
                {preguntas.map((pregunta, pIndex) => (
                    <div key={pregunta._key} className="space-y-2 rounded-md border bg-background p-3">
                        <div className="flex items-center gap-2">
                            <Input
                                value={pregunta.enunciado}
                                onChange={(e) => actualizarPregunta(pregunta._key, { enunciado: e.target.value })}
                                placeholder={`Pregunta ${pIndex + 1}`}
                                className="h-8 text-sm"
                            />

                            {preguntas.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                                    onClick={() => quitarPregunta(pregunta._key)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            )}
                        </div>

                        <div className="space-y-1.5 pl-1">
                            {pregunta.opciones.map((opcion, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={`correcta-${pregunta._key}`}
                                        checked={opcion.esCorrecta}
                                        onChange={() => marcarCorrecta(pregunta._key, oIndex)}
                                        className="h-4 w-4 shrink-0"
                                        title="Marcar como correcta"
                                    />
                                    <Input
                                        value={opcion.texto}
                                        onChange={(e) => actualizarOpcion(pregunta._key, oIndex, e.target.value)}
                                        placeholder={`Opción ${oIndex + 1}`}
                                        className="h-8 text-sm"
                                    />
                                    {pregunta.opciones.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                                            onClick={() => quitarOpcion(pregunta._key, oIndex)}
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
                                onClick={() => agregarOpcion(pregunta._key)}
                            >
                                <Plus className="h-3 w-3" />
                                Agregar opción
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <Button type="button" variant="outline" size="sm" onClick={agregarPregunta} className="gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    Agregar pregunta
                </Button>

                <Button type="button" size="sm" onClick={handleSubmit} disabled={!valido || isPending} className="gap-2">
                    {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Guardar checkpoint
                </Button>
            </div>
        </div>
    );
}