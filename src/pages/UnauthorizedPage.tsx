import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>

          <CardTitle className="text-2xl">
            Acceso no autorizado
          </CardTitle>

          <CardDescription>
            No tienes permisos para ver esta página.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground">
          Si llegaste aquí por error, intenta iniciar sesión con otra cuenta
          o solicita acceso al administrador.
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Volver al inicio
          </Button>

          <Button
            onClick={() => window.location.href = "/login"}
          >
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
