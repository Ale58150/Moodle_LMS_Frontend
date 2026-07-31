import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

const Loading = () => <div>Cargando...</div>;

const Inicio = () => (
    <div className="p-6">
        <h1 className="text-3xl font-bold">Inicio</h1>
        <p>Página de prueba.</p>
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <RootLayout />
            </Suspense>
        ),
        children: [
            {
                element: (
                    <Suspense fallback={<Loading />}>
                        <DashboardLayout />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: <Inicio />,
                    },
                ],
            },
        ],
    },
]);