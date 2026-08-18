import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MascotError } from "../mascots";


interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: unknown) {
        console.error("Error de renderizado no controlado:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
                    <MascotError className="h-40 w-auto" />
                    <div>
                        <p className="text-lg font-semibold">Algo salió mal</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Ocurrió un error inesperado. Intenta recargar la página.
                        </p>
                    </div>
                    <Button onClick={() => window.location.reload()}>Recargar</Button>
                </div>
            );
        }

        return this.props.children;
    }
}