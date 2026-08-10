import { useAuthStore } from "@/store/authStore";

export function usePermission() {
    const permisos = useAuthStore(
        (state) => state.permisos
    );

    const can = (permission: string) => {
        return permisos.includes(permission);
    };

    const canAny = (permissions: string[]) => {
        return permissions.some((permission) =>
            permisos.includes(permission)
        );
    };

    const canAll = (permissions: string[]) => {
        return permissions.every((permission) =>
            permisos.includes(permission)
        );
    };

    return {
        can,
        canAny,
        canAll,
    };
}