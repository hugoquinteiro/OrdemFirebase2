import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookMarked } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
       <Card>
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <BookMarked className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="font-headline text-2xl">BudgetBuddy</CardTitle>
          <CardDescription>
            Faça login para acessar seus orçamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Sua senha" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/">Entrar</Link>
          </Button>
          <Button variant="link" size="sm" className="w-full">
            Esqueceu a senha?
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
