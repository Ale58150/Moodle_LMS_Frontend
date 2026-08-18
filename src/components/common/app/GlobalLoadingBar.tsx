import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function GlobalLoadingBar() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const activo = isFetching > 0 || isMutating > 0;

    if (!activo) return null;

    return (
        <div className="fixed left-0 right-0 top-0 z-[100] h-0.5 overflow-hidden bg-primary/20">
            <div className="h-full w-1/3 animate-[loading-bar_1s_ease-in-out_infinite] bg-primary" />
        </div>
    );
}