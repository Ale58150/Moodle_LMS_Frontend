import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    SidebarMenuItem,
    SidebarMenuButton,
} from "../ui/sidebar";

interface LinkSidebarProps {
    to: string;
    icon: IconDefinition;
    title: string;
    isActive?: boolean;
}

export function LinkSidebar({
    to,
    icon,
    title,
    isActive,
}: LinkSidebarProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={title}
            >
                <Link to={to}>
                    <FontAwesomeIcon icon={icon} />
                    <span>{title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}