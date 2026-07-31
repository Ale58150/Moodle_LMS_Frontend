import AppSidebar from "@/components/dashboard/AppSidebar";
import { Headerbar } from "@/components/nav/headerbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <Headerbar />
                <div className="mt-12">
                    <Outlet />
                </div>
                {/* es como children en next js o slot en otros frameworks */}
            </main>
        </SidebarProvider>
    )
}