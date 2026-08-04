import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "../Schema/AuthSchema";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../Hook/AuthHook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppTitle } from "@/components/common/Apptittle";

export function Reset_password_form() {
    const changePasswordMutation = useChangePassword();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema)
    });

    const onSubmit = (data: ResetPasswordSchemaType) => {
        changePasswordMutation.mutate(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <AppTitle title="Cambia tu contraseña" subtitle="Por favor, recuerda no olvidarte tu contraseña" />
                    </CardHeader>

                    <CardContent>
                        <FieldGroup className="gap-3">
                            <Field>
                                <FieldLabel htmlFor="new_password">
                                    Nueva contraseña
                                </FieldLabel>
                                <Input
                                    id="new_password"
                                    type="password"
                                    placeholder="**********"
                                    {...register("new_password")}
                                />
                                {errors.new_password && (
                                    <span className="text-sm text-red-500">
                                        {errors.new_password.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="confirm_password">
                                    Confirmar contraseña
                                </FieldLabel>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    placeholder="********"
                                    {...register("confirm_password")}
                                />
                                {errors.confirm_password && (
                                    <span className="text-sm text-red-500">
                                        {errors.confirm_password.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={changePasswordMutation.isPending}
                                >
                                    {changePasswordMutation.isPending
                                        ? "Cambiando..."
                                        : "Cambiar contraseña"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
