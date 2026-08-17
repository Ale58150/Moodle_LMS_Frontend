import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "@/components/Login/ProtectedRoute";
import { AuthPage } from "@/pages/Auth/AuthPage";
import { ChangePassword } from "@/pages/Auth/ChangePassword";
import { ProfilePage } from "@/pages/Auth/MeProfile";
import UsuarioPage from "@/pages/Usuario/UsuarioPage";
import UsuarioDetallePage from "@/pages/Usuario/UsuarioDetallePage";
import CursosPage from "@/pages/Curso/CursoPage";
import CursoDetallePage from "@/pages/Curso/CursoDetallePage";
import ModulosPage from "@/pages/Modulo/ModuloPage";
import ModuloDetallePage from "@/pages/Modulo/ModuloDetallePage";
import LeccionDetallePage from "@/pages/Leccion/LeccionDetallePage"; // 👈 nuevo

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
                path: "login",
                element: <AuthPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "cambiar-password",
                        element: <ChangePassword />,
                    },
                    {
                        element: (
                            <Suspense fallback={<Loading />}>
                                <DashboardLayout />
                            </Suspense>
                        ),
                        children: [
                            { path: "inicio", element: <Inicio /> },
                            { path: "perfil", element: <ProfilePage /> },
                            { path: "usuario", element: <UsuarioPage /> },
                            { path: "usuario/:id", element: <UsuarioDetallePage /> },
                            { path: "cursos", element: <CursosPage /> },
                            { path: "cursos/:id", element: <CursoDetallePage /> },
                            { path: "cursos/:id/modulos", element: <ModulosPage /> },
                            { path: "cursos/:id/modulos/:moduloId", element: <ModuloDetallePage /> },
                            {
                                path: "cursos/:id/modulos/:moduloId/lecciones/:leccionId", // 👈 nuevo
                                element: <LeccionDetallePage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);