import { useLocation } from "react-router-dom";
import { useSidebar, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ModeToggle";
import { useAuthStore } from "@/store/authStore";
import ButtonLogOut from "../Login/ButtonLogOut";

export const Headerbar = () => {
    const location = useLocation();
    const { state, isMobile } = useSidebar();

    // Leemos el estado verídico directamente de tu store global
    const usuario = useAuthStore((state) => state.usuario);
    const rol = useAuthStore((state) => state.rol);

    // Formateamos el nombre completo del usuario de forma segura
    const fullName = usuario?.nombre && usuario?.apellido_paterno
        ? `${usuario.nombre} ${usuario.apellido_paterno}`
        : "Usuario";

    // Generamos las iniciales para el avatar minimalista
    const initials = usuario?.nombre && usuario?.apellido_paterno
        ? `${usuario.nombre[0]}${usuario.apellido_paterno[0]}`.toUpperCase()
        : "U";

    // Mapeamos el nombre de la página según la ruta actual en el navegador
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.endsWith("/inicio")) return "Inicio";
        if (path.endsWith("/usuarios")) return "Gestión de Usuarios";
        if (path.endsWith("/cursos")) return "Gestión de Cursos";
        if (path.endsWith("/mis-cursos")) return "Mis Cursos";
        if (path.endsWith("/perfil")) return "Mi Perfil";
        return "Dashboard";
    };

    return (
        <header
            className={`
                fixed top-0 z-20 flex items-center justify-between h-14 px-6 transition-all duration-300 ease-in-out                backdrop-blur-md
                border-b border-border bg-background/80 ${state === "expanded" && !isMobile ? "w-[calc(100vw-16rem)] left-64" : "w-full left-0"}            `}
        >
            <div className="flex items-center gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors h-9 w-9" />
                <div className="h-4 w-[1px] bg-border hidden sm:block" />
                <h1 className="hidden sm:block text-sm font-semibold tracking-tight text-foreground">
                    {getPageTitle()}
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border/40 bg-muted/30 dark:bg-neutral-900/40">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold uppercase tracking-wider">
                        {initials}
                    </div>
                    <div className="flex flex-col text-left justify-center">
                        <span className="text-xs font-bold text-foreground leading-none">
                            {fullName}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5 leading-none">
                            {rol || "Invitado"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <div className="h-4 w-[1px] bg-border mx-1" />
                <ButtonLogOut />
            </div>
        </header>
    );
};
