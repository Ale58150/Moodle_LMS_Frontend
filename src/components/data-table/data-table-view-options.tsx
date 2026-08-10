"use client";

import {
    Table as ReactTable,
} from "@tanstack/react-table";

import {
    Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
    table: ReactTable<TData>;
}
export function DataTableViewOptions<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8"
                >
                    <Settings2
                        className="mr-2 h-4 w-4"
                    />
                    Columnas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[180px]"
            >
                <DropdownMenuLabel>
                    Mostrar columnas
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined"
                                &&
                                column.getCanHide()
                        )
                        .map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                checked={
                                    column.getIsVisible()
                                }
                                onCheckedChange={
                                    (value) =>
                                        column.toggleVisibility(
                                            Boolean(value)
                                        )
                                }
                                className="capitalize"
                            >
                                {
                                    column.id
                                }
                            </DropdownMenuCheckboxItem>
                        ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}