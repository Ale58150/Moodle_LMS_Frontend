import AppSidebar from "@/components/dashboard/AppSidebar";
import { Headerbar } from "@/components/nav/headerbar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Headerbar />
                <div>
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}