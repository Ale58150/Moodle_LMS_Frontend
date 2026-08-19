import { useState } from "react";
import { Download, FileText, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecursoLeccionType } from "../Schema/LeccionSchema";

interface RecursoViewerProps {
    recurso: RecursoLeccionType;
}

export function RecursoViewer({ recurso }: RecursoViewerProps) {
    const [mostrarViewer, setMostrarViewer] = useState(false);
    const href = recurso.urlExterna ?? recurso.rutaRecurso ?? "";
    const esPdf = recurso.tipoRecurso === "pdf";

    if (esPdf && href) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{recurso.nombre}</span>
                    </div>

                    <div className="flex shrink-0 gap-1">
                        <Button type="button" variant="outline" size="sm" onClick={() => setMostrarViewer((v) => !v)}>
                            {mostrarViewer ? "Ocultar" : "Ver PDF"}
                        </Button>
                        <a href={href} download target="_blank" rel="noreferrer">
                            <Button type="button" variant="ghost" size="icon" title="Descargar">
                                <Download className="h-4 w-4" />
                            </Button>
                        </a>
                    </div>
                </div>

                {mostrarViewer && (
                    <iframe
                        src={href}
                        title={recurso.nombre}
                        className="h-[70vh] w-full rounded-lg border sm:h-[600px]"
                    />
                )}
            </div>
        );
    }

    const Icono = recurso.tipoRecurso === "enlace" ? LinkIcon : FileText;

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
        >
            <span className="flex min-w-0 items-center gap-2">
                <Icono className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{recurso.nombre}</span>
            </span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </a >
    );
}