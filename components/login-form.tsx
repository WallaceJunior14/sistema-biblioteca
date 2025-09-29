"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (userType: "associado" | "bibliotecario") => {
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user type in localStorage for demo purposes
    localStorage.setItem("userType", userType)

    // Redirect to dashboard
    router.push("/dashboard")

    setIsLoading(false)
  }

  return (
    <Card className="w-full border-border bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">Acesso ao Sistema</CardTitle>
        <CardDescription className="text-center">Entre com suas credenciais para acessar a biblioteca</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="associado" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="associado" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Associado
            </TabsTrigger>
            <TabsTrigger value="bibliotecario" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Bibliotecário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="associado" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codigo-associado">Código ou E-mail</Label>
              <Input
                id="codigo-associado"
                placeholder="Digite seu código ou e-mail"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha-associado">Senha</Label>
              <div className="relative">
                <Input
                  id="senha-associado"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="bg-input border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleLogin("associado")} disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar como Associado"}
            </Button>
            <div className="text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Sou associado novo
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bibliotecario" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codigo-bibliotecario">Código de Funcionário</Label>
              <Input id="codigo-bibliotecario" placeholder="Digite seu código" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha-bibliotecario">Senha</Label>
              <div className="relative">
                <Input
                  id="senha-bibliotecario"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="bg-input border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleLogin("bibliotecario")} disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar como Bibliotecário"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
