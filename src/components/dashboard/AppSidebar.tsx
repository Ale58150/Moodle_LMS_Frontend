import { Sidebar, SidebarContent, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "../ui/sidebar";
import { useLocation } from "react-router-dom";
import { LinkSidebar } from "../nav/Link";
import ButtonLogOut from "../Login/ButtonLogOut";
import { menuItems } from "@/lib/menus";
import { useAuthStore } from "@/store/authStore";

export default function AppSidebar() {
    const pathname = useLocation().pathname;
    const backendMenu = useAuthStore((state) => state.menu) || [];

    // Filtramos las rutas cruzando frontend y backend
    const visibleMenuItems = menuItems.filter((localItem) => {
        // 💡 Forzamos a que la pestaña "Inicio" siempre sea visible
        if (localItem.url === "/inicio") return true;

        // Comparamos de forma exacta el resto de las rutas
        return backendMenu.some((backendItem) => backendItem.ruta === localItem.url);
    });

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroupLabel className="text-xl h-12 flex gap-2 text-primary dark:text-primary font-bold justify-center">
                    ELITE ACADEMY
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {visibleMenuItems.map((item, idx) => (
                            <LinkSidebar
                                key={idx}
                                to={item.url} // 💡 Directo a la URL (ej: /inicio o /usuarios)
                                icon={item.icon}
                                title={item.title}
                                isActive={pathname === item.url} // 💡 Marcamos activo de forma exacta
                            />
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <ButtonLogOut />
        </Sidebar>
    );
}
