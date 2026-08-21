interface MascotProps {
    className?: string;
}

function Sparkle({ cx, cy, r, className }: { cx: number; cy: number; r: number; className?: string }) {
    return (
        <path
            d={`M ${cx},${cy - r} Q ${cx + r * 0.35},${cy - r * 0.35} ${cx + r},${cy} Q ${cx + r * 0.35},${cy + r * 0.35} ${cx},${cy + r} Q ${cx - r * 0.35},${cy + r * 0.35} ${cx - r},${cy} Q ${cx - r * 0.35},${cy - r * 0.35} ${cx},${cy - r} Z`}
            className={className}
        />
    );
}

function Backdrop() {
    return (
        <>
            <ellipse cx={100} cy={146} rx={50} ry={7} className="fill-muted" />
            <circle cx={100} cy={76} r={62} className="fill-primary/5" />
            <circle cx={100} cy={76} r={62} className="fill-none stroke-primary/15" strokeWidth={1.5} strokeDasharray="2 5" />
        </>
    );
}

export function MascotSinPermiso({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Backdrop />

            <path
                d="M92 108 C90 122, 90 132, 86 140 C84 143, 88 145, 92 143 C96 141, 96 136, 100 136 C104 136, 104 141, 108 143 C112 145, 116 143, 114 140 C110 132, 110 122, 108 108 Z"
                className="fill-primary/70"
            />

            <circle cx={100} cy={72} r={40} className="fill-muted stroke-primary" strokeWidth={4} />
            <circle cx={100} cy={72} r={33} className="fill-background/40 stroke-primary/30" strokeWidth={1.5} />

            <g transform="translate(84 56)">
                <path d="M6 14 V9 a10 10 0 0 1 20 0 v5" className="stroke-foreground" strokeWidth={4} fill="none" strokeLinecap="round" />
                <rect x={0} y={14} width={32} height={24} rx={6} className="fill-foreground" />
                <circle cx={16} cy={25} r={3.2} className="fill-background" />
            </g>

            <Sparkle cx={150} cy={34} r={7} className="fill-primary/60" />
            <Sparkle cx={44} cy={52} r={5} className="fill-primary/40" />
            <Sparkle cx={158} cy={70} r={4} className="fill-primary/40" />
        </svg>
    );
}

export function MascotNoEncontrado({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Backdrop />

            <g transform="translate(78 40)">
                <path d="M14 0 h16 l3 10 h-22 Z" className="fill-primary" />
                <rect x={18} y={-6} width={8} height={8} rx={1.5} className="fill-primary" />
                <path
                    d="M8 10 h28 c3 0 5 2 5 5 v40 c0 6 -4 10 -10 10 h-18 c-6 0 -10 -4 -10 -10 v-40 c0 -3 2 -5 5 -5 Z"
                    className="fill-muted stroke-border"
                    strokeWidth={2}
                />
                <path
                    d="M22 30 c-6 -6 -14 -2 -10 4 c2 3 7 3 10 0 c3 3 8 3 10 0 c4 -6 -4 -10 -10 -4 Z"
                    className="fill-primary/50"
                />
            </g>

            <g transform="translate(112 26)">
                <circle cx={18} cy={18} r={16} className="stroke-primary" strokeWidth={5} fill="none" />
                <line x1={29} y1={29} x2={44} y2={44} className="stroke-primary" strokeWidth={6} strokeLinecap="round" />
            </g>
            <Sparkle cx={48} cy={46} r={6} className="fill-primary/50" />
            <Sparkle cx={150} cy={100} r={5} className="fill-primary/40" />
        </svg>
    );
}

export function MascotError({ className }: MascotProps) {
    return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Backdrop />

            <g transform="translate(100 92) rotate(-18)">
                <rect x={-14} y={0} width={28} height={34} rx={6} className="fill-muted stroke-border" strokeWidth={2} />
                <rect x={-14} y={18} width={28} height={4} className="fill-border" />
                <rect x={-12} y={-16} width={24} height={18} rx={3} className="fill-primary" />
                <path d="M-10 -16 L -4 -30 L 4 -24 L 10 -16 Z" className="fill-destructive/70" />
                <path d="M-4 -30 L 0 -24 L 4 -24" className="stroke-destructive" strokeWidth={1.5} strokeLinecap="round" fill="none" />
            </g>

            <g transform="translate(126 30)">
                <ellipse cx={16} cy={16} rx={20} ry={14} className="fill-destructive/15 stroke-destructive" strokeWidth={2} />
                <line x1={16} y1={9} x2={16} y2={18} className="stroke-destructive" strokeWidth={3} strokeLinecap="round" />
                <circle cx={16} cy={23} r={1.8} className="fill-destructive" />
            </g>

            <Sparkle cx={52} cy={50} r={6} className="fill-primary/40" />
            <Sparkle cx={68} cy={120} r={5} className="fill-primary/40" />
        </svg>
    );
}