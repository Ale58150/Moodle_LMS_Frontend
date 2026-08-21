import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BannerProps {
    title: string;
    description?: string;
    ctaLabel?: string;
    ctaTo?: string;
    icon?: ReactNode;
    className?: string;
}

export function Banner({ title, description, ctaLabel, ctaTo, icon, className }: BannerProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground sm:p-8 ${className ?? ""}`}
        >
            {icon && (
                <div className="pointer-events-none absolute -right-4 -top-4 opacity-15 [&>svg]:h-32 [&>svg]:w-32 sm:[&>svg]:h-40 sm:[&>svg]:w-40">
                    {icon}
                </div>
            )}

            <div className="relative max-w-lg space-y-2">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
                {description && <p className="text-sm text-primary-foreground/90">{description}</p>}

                {ctaLabel && ctaTo && (
                    <Link to={ctaTo}>
                        <Button type="button" variant="secondary" size="sm" className="mt-2">
                            {ctaLabel}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}