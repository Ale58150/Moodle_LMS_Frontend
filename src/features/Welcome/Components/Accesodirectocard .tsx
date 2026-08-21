import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface AccesoDirectoCardProps {
    to: string;
    icon: ReactNode;
    title: string;
    description: string;
    stat?: string | number;
}

export function AccesoDirectoCard({ to, icon, title, description, stat }: AccesoDirectoCardProps) {
    return (
        <Link
            to={to}
            className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:shadow-sm"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    {stat !== undefined && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {stat}
                        </span>
                    )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
    );
}