interface MascotProps {
    className?: string;
}

export function MascotSinPermiso({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="148" rx="46" ry="8" className="fill-muted" />

            <rect x="55" y="55" width="90" height="80" rx="28" className="fill-muted stroke-border" strokeWidth="2" />

            <circle cx="82" cy="92" r="6" className="fill-foreground" />
            <circle cx="118" cy="92" r="6" className="fill-foreground" />

            <path d="M85 112 Q100 104 115 112" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" fill="none" />

            <path d="M55 95 Q35 100 38 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M145 95 Q165 100 162 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />

            <g transform="translate(84 18)">
                <rect x="0" y="14" width="32" height="26" rx="6" className="fill-primary" />
                <path d="M6 14 V8 a10 10 0 0 1 20 0 v6" className="stroke-primary" strokeWidth="5" fill="none" />
                <circle cx="16" cy="27" r="4" className="fill-primary-foreground" />
            </g>
        </svg>
    );
}

export function MascotNoEncontrado({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="148" rx="46" ry="8" className="fill-muted" />

            <rect x="55" y="55" width="90" height="80" rx="28" className="fill-muted stroke-border" strokeWidth="2" />

            <path d="M76 92 h12" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
            <path d="M112 92 h12" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />

            <path d="M88 114 h24" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />

            <path d="M55 95 Q35 100 38 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M145 95 Q165 100 162 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />

            <g transform="translate(118 10)">
                <circle cx="14" cy="14" r="13" className="stroke-primary" strokeWidth="5" fill="none" />
                <line x1="24" y1="24" x2="36" y2="36" className="stroke-primary" strokeWidth="6" strokeLinecap="round" />
            </g>
        </svg>
    );
}

export function MascotError({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="148" rx="46" ry="8" className="fill-muted" />

            <rect x="55" y="55" width="90" height="80" rx="28" className="fill-muted stroke-border" strokeWidth="2" />

            <path d="M76 88 l10 10 M86 88 l-10 10" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />
            <path d="M114 88 l10 10 M124 88 l-10 10" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />

            <path d="M85 118 Q100 108 115 118" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" fill="none" />

            <path d="M55 95 Q35 100 38 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M145 95 Q165 100 162 118" className="stroke-muted-foreground" strokeWidth="6" strokeLinecap="round" fill="none" />

            <g transform="translate(122 8)">
                <ellipse cx="16" cy="16" rx="18" ry="13" className="fill-destructive/15 stroke-destructive" strokeWidth="2" />
                <line x1="16" y1="9" x2="16" y2="17" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
                <circle cx="16" cy="22" r="1.6" className="fill-destructive" />
            </g>
        </svg>
    );
}