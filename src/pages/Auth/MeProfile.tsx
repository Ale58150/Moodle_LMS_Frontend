import { ProfileView } from "@/features/Auth/components/me_profile";

export function ProfilePage() {
    return (
        <div className="min-h-screen w-full bg-neutral-50 dark:bg-black p-4 md:p-8 flex items-center justify-center">
            <div className="w-full animate-fade-in">
                <ProfileView />
            </div>
        </div>
    );
}
