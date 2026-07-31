import { Sidebar, SidebarContent, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "../ui/sidebar";
import { useLocation } from "react-router-dom";
import { LinkSidebar } from "../nav/Link";
import ButtonLogOut from "../Login/ButtonLogOut";
import { useRoles } from "@/hooks/useRoles";
import { menuItems } from "@/lib/menus";
// import { Label } from "@radix-ui/react-label";

export default function AppSidebar() {
    const pathname = useLocation().pathname;
    const { isRouteVisible } = useRoles();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroupLabel className="text-xl h-12 flex gap-2     text-primary 
    dark:text-primary font-bold justify-center">
                    ELITE ACADEMY
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuItems.map((item: any, idx: any) =>
                            isRouteVisible(item.url) && (
                                <LinkSidebar
                                    key={idx}
                                    to={`/dashboard${item.url}`}
                                    icon={item.icon}
                                    title={item.title}
                                    isActive={pathname === `/dashboard${item.url}`}
                                />
                            )
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <ButtonLogOut />
        </Sidebar>
    );
}