import { ReactNode } from "react";
import { AppTitle } from "@/components/common/Apptittle";

interface InfoSectionProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    withDivider?: boolean;
}

export function InfoSection({ title, subtitle, children, withDivider = true }: InfoSectionProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <AppTitle title={title} subtitle={subtitle} />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:col-span-2">
                    {children}
                </div>
            </div>

            {withDivider && <hr className="border-neutral-200 dark:border-neutral-800" />}
        </>
    );
}