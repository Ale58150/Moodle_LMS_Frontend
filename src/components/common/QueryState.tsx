import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { getApiErrorMessage, getApiErrorStatus } from "@/utils/apiError";
import { MascotSinPermiso, MascotNoEncontrado, MascotError } from "./mascots";

interface QueryStateProps {
    isLoading: boolean;
    isError: boolean;
    error?: unknown;
    children: ReactNode;
    minHeight?: string;
    fallbackMessage?: string;
}

export function QueryState({
    isLoading,
    isError,
    error,
    children,
    minHeight = "min-h-[300px]",
    fallbackMessage = "Ocurrió un error inesperado.",
}: QueryStateProps) {
    if (isLoading) {
        return (
            <div className={`flex ${minHeight} items-center justify-center`}>
                <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        const status = getApiErrorStatus(error);

        if (status === 403) {
            return (
                <div className={`flex ${minHeight} flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center`}>
                    <MascotSinPermiso className="h-32 w-auto" />
                    <div>
                        <p className="text-sm font-medium">No tienes permisos para ver esto</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Si crees que es un error, contacta a un administrador.
                        </p>
                    </div>
                </div>
            );
        }

        if (status === 404) {
            return (
                <div className={`flex ${minHeight} flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center`}>
                    <MascotNoEncontrado className="h-32 w-auto" />
                    <p className="text-sm font-medium">No encontramos lo que buscabas</p>
                </div>
            );
        }

        return (
            <div className={`flex ${minHeight} flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center`}>
                <MascotError className="h-32 w-auto" />
                <p className="text-sm text-muted-foreground">{getApiErrorMessage(error, fallbackMessage)}</p>
            </div>
        );
    }

    return <>{children}</>;
}