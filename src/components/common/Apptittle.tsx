interface AppTitleProps {
    title: string;
    subtitle?: string;
}

export function AppTitle({ title, subtitle }: AppTitleProps) {
    return (
        <div>
            <h1 className="text-lg font-bold tracking-wide text-primary">
                {title}
            </h1>

            <p className="text-xs text-muted-foreground">
                {subtitle}
            </p>
        </div>
    );
}