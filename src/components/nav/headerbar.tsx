import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ModeToggle";
import { useRoles } from "@/hooks/useRoles";
import { menuItems } from "@/lib/menus";
import ButtonLogOut from "../Login/ButtonLogOut";

export const Headerbar = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { isRouteVisible } = useRoles();
    const location = useLocation();
    const { state, isMobile } = useSidebar();

    const [hideSidebar, setHideSidebar] = useState(true);
    const [, setShowShortcutInfo] = useState(false);

    const visibleMenus = menuItems.filter(item => isRouteVisible(item.url));

    useEffect(() => {
        const onlyPosMenu =
            visibleMenus.length === 1 && visibleMenus[0].url === "/pos";

        setHideSidebar(onlyPosMenu);
    }, [visibleMenus]);

    useEffect(() => {
        const showShortcutInfoVerify = location.pathname.endsWith("/pos");
        setShowShortcutInfo(showShortcutInfoVerify);
    }, [location.pathname]);


    const name =
        user?.nombre && user?.apellido_paterno
            ? `${user.nombre} ${user.apellido_paterno}`
            : "Estudiante";


    return (
        <header
            className={`
                fixed top-0 left-0 z-20
                flex items-center justify-between
                h-14 px-6
                transition-all duration-300
                backdrop-blur-xl

                border-b border-border

                bg-background/80

                shadow-sm

                ${state === "expanded" && !isMobile
                    ? "w-[calc(100vw-16rem)] left-64"
                    : "w-full left-0"
                }
            `}
        >

            {/* Sidebar trigger */}
            {!hideSidebar && (
                <div className="flex items-center gap-3">

                    <SidebarTrigger
                        className="
                            text-muted-foreground
                            hover:text-primary
                            transition-colors
                        "
                    />

                    <h1
                        className="
                            hidden sm:block
                            text-base
                            font-semibold
                            text-foreground
                            tracking-tight
                        "
                    >
                        Dashboard
                    </h1>

                </div>
            )}


            {/* Usuario */}
            <div
                className="
                    flex items-center gap-3
                    text-sm
                    font-medium
                    text-foreground
                "
            >

                <div
                    className="
                        flex items-center gap-2
                        px-3 py-1.5

                        bg-secondary

                        rounded-full
                        shadow-sm

                        hover:bg-accent

                        transition
                    "
                >

                    {/* Avatar */}
                    <div
                        className="
                            w-8 h-8
                            rounded-full

                            bg-primary
                            text-primary-foreground

                            flex items-center justify-center

                            font-semibold
                            shadow-sm
                        "
                    >
                        {user?.nombre
                            ? user.nombre[0].toUpperCase()
                            : "E"}
                    </div>


                    <div className="flex flex-col leading-tight">

                        <span
                            className="
                                text-[13px]
                                font-semibold
                                text-foreground
                            "
                        >
                            {name}
                        </span>


                        <span
                            className="
                                text-[11px]
                                text-muted-foreground
                            "
                        >
                            Estudiante
                        </span>

                    </div>

                </div>

            </div>



            {/* Acciones */}
            <div className="flex items-center gap-2">

                <ModeToggle />

                <ButtonLogOut />

            </div>


        </header>
    );
};