import {
    faHouse,
    faUsersGear,
    faBook,
    faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Usuarios",
        icon: faUsersGear,
        url: "/usuarios",
        roles: ["administrador"],
    },
    {
        title: "Cursos",
        icon: faBook,
        url: "/cursos",
        roles: ["administrador"],
    },
    {
        title: "Mis cursos",
        icon: faGraduationCap,
        url: "/mis-cursos",
        roles: ["estudiante"],
    },
];
