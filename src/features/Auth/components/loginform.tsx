import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthSchema, AuthSchemaType } from "../Schema/AuthSchema";
import { useLogin } from "../Hook/AuthHook";

export function LoginForm() {

    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthSchemaType>({
        resolver: zodResolver(AuthSchema)
    });

    const onSubmit = (data: AuthSchemaType) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Iniciar sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus datos para acceder
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-3">

                            <Field>
                                <FieldLabel htmlFor="correo">
                                    Correo
                                </FieldLabel>

                                <Input
                                    id="correo"
                                    type="email"
                                    placeholder="correo@gmail.com"
                                    {...register("correo")}
                                />

                                {errors.correo && (
                                    <span className="text-sm text-red-500">
                                        {errors.correo.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">
                                    Contraseña
                                </FieldLabel>

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                />

                                {errors.password && (
                                    <span className="text-sm text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? "Ingresando..."
                                        : "Ingresar"}
                                </Button>

                                <FieldDescription className="text-center">
                                    ¿Te olvidaste tu contraseña?{" "}
                                    <a href="#" className="underline">
                                        Escribe a soporte
                                    </a>
                                </FieldDescription>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}