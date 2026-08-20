import {
    faHouse,
    faUsersGear,
    faBook,
    faGraduationCap,
    faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/inicio",
        roles: ["administrador", "estudiante"],
    },
    {
        title: "Usuarios",
        icon: faUsersGear,
        url: "/usuario",
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
    {
        title: "Inscripciones",
        icon: faIdBadge,
        url: "/inscripciones",
        roles: ["administrador"],
    }
];
