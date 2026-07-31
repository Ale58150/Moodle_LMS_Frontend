import { menuItems } from "@/lib/menus";

// Verifica si el rol tiene acceso al item
export const useRoles = () => {

    const isRouteVisible = (url: string) => {
        const item = menuItems.find(item => item.url === url);
        if (!item) return false;

    };

    return { isRouteVisible };
};