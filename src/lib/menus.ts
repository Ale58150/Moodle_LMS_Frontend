import {
    faHouse,
    faClipboardQuestion,
    faBookOpenReader,
    faCalendarDay,
    faRankingStar,
    faMedal,
    faUser,
    faUsersGear,
    faClipboardCheck,
    faFolderOpen,
    faSitemap,
    faBug,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Test",
        icon: faClipboardQuestion, // cuestionario/examen
        url: "/test",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Biblioteca",
        icon: faBookOpenReader, // lectura/estudio
        url: "/biblioteca",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Desafío Diario",
        icon: faCalendarDay, // reto por día
        url: "/desafio",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Ranking",
        icon: faRankingStar, // ranking/clasificación
        url: "/ranking",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Insignias",
        icon: faMedal, // medallas/logros
        url: "/insignia",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Perfil",
        icon: faUser,
        url: "/perfil",
        roles: ["administrador", "estudiante"],
    },

    // 🔹 Sección administración
    {
        title: "Usuarios",
        icon: faUsersGear, // gestión de usuarios
        url: "/user",
        roles: ["administrador"],
    },
    {
        title: "Gestor de test",
        icon: faClipboardCheck, // administrar pruebas
        url: "/gestor-test",
        roles: ["administrador"],
    },
    {
        title: "Gestor de Biblioteca",
        icon: faFolderOpen, // administrar recursos/archivos
        url: "/gestor-biblioteca",
        roles: ["administrador"],
    },
    {
        title: "Gestor de Temas",
        icon: faSitemap, // estructura/temario
        url: "/gestor-temas",
        roles: ["administrador"],
    },
    {
        title: "Reportes",
        icon: faBug,
        url: "/reportes",
        roles: ["administrador"],
    },
];