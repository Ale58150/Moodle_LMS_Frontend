import { ReactNode } from "react";
import { Field, FieldLabel } from "@/components/ui/field";

interface InfoFieldProps {
    label: string;
    value: ReactNode;
    className?: string;
    valueClassName?: string;
}

const VALUE_DEFAULT = "mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-200";

export function InfoField({ label, value, className, valueClassName }: InfoFieldProps) {
    return (
        <Field className={className}>
            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {label}
            </FieldLabel>
            <p className={valueClassName ?? VALUE_DEFAULT}>{value}</p>
        </Field>
    );
}