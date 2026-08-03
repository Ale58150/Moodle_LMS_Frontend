import { useMeProfile } from "../Hook/AuthHook";
import { AppTitle } from "@/components/common/Apptittle";
import { Field, FieldLabel } from "@/components/ui/field";

export function ProfileView() {
    const { data: usuario, isLoading, isError } = useMeProfile();

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center dark:bg-black">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <span className="text-sm font-medium text-neutral-500">Cargando información...</span>
                </div>
            </div>
        );
    }

    if (isError || !usuario) {
        return (
            <div className="py-6 text-left dark:bg-black">
                <span className="text-sm font-medium text-red-500">
                    No se pudieron cargar los datos de tu cuenta.
                </span>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 dark:bg-black">
            <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <AppTitle
                    title="Configuración de Cuenta"
                    subtitle="Administra tu información personal y preferencias en Elite Academy"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <AppTitle
                        title="Fotografía de Perfil"
                        subtitle="Imagen de identificación institucional."
                    />
                </div>
                <div className="md:col-span-2 flex items-center gap-4">
                    {usuario.fotografia_ruta ? (
                        <img
                            src={usuario.fotografia_ruta}
                            alt={usuario.nombre}
                            className="w-16 h-16 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center text-xl font-bold uppercase">
                            {usuario.nombre.charAt(0)}{usuario.apellido_paterno.charAt(0)}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 uppercase tracking-wide text-xs">Estado de Cuenta</p>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 uppercase mt-0.5">
                            {usuario.estado}
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <AppTitle
                        title="Datos Personales"
                        subtitle="Tu nombre legal y validación de identidad."
                    />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Nombre Completo</FieldLabel>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1">
                            {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno || ""}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Documento de Identidad</FieldLabel>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1">
                            <span className="text-primary mr-1.5 font-bold">{usuario.tipo_documento_identidad || "CI"}</span>
                            {usuario.numero_documento || "No registrado"}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Fecha de Nacimiento</FieldLabel>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1">
                            {usuario.fecha_nacimiento || "No registrada"}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Género</FieldLabel>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1">
                            {usuario.genero === "M" ? "Masculino" : usuario.genero === "F" ? "Femenino" : "No especificado"}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Rol de Acceso</FieldLabel>
                        <p className="text-sm font-semibold text-primary uppercase mt-1 tracking-wide">
                            {usuario.ocupacion || "Usuario"}
                        </p>
                    </Field>
                </div>
            </div>
            <hr className="border-neutral-200 dark:border-neutral-800" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <AppTitle
                        title="Contacto y Ubicación"
                        subtitle="Canales de comunicación y residencia actual."
                    />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <Field className="sm:col-span-2">
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Correo Electrónico</FieldLabel>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1 break-all">
                            {usuario.correo}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Teléfono / Celular</FieldLabel>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-1">
                            {usuario.telefono || "No registrado"}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-bold">Ubicación</FieldLabel>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-1">
                            {usuario.ciudad && usuario.pais ? `${usuario.ciudad}, ${usuario.pais}` : "No registrada"}
                        </p>
                    </Field>
                </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <AppTitle
                        title="Contacto de Emergencia"
                        subtitle="Persona de respaldo ante eventualidades."
                    />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wider uppercase font-bold">Nombre de Contacto</FieldLabel>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-1">
                            {usuario.contacto_emergencia_nombre || "No registrado"}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wider uppercase font-bold">Teléfono de Contacto</FieldLabel>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-1">
                            {usuario.contacto_emergencia_telefono || "No registrado"}
                        </p>
                    </Field>
                </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <AppTitle
                        title="Seguridad del Sistema"
                        subtitle="Fechas de registro y accesos a la cuenta."
                    />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wider uppercase font-bold">Miembro desde</FieldLabel>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                            {new Date(usuario.created_at).toLocaleDateString()}
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wider uppercase font-bold">Último Acceso Detectado</FieldLabel>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                            {usuario.ultimo_acceso_en ? new Date(usuario.ultimo_acceso_en).toLocaleString() : "Sesión actual"}
                        </p>
                    </Field>
                </div>
            </div>
        </div>
    );
}
