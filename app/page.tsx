import { LoginForm } from "@/components/login-form"
import { BookOpen, GraduationCap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-card to-secondary p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Sistema de Biblioteca</h1>
            <p className="text-sm text-muted-foreground">UTFPR - Campus Ponta Grossa</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">Acesse seu acervo acadêmico</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Consulte livros, revistas e gerencie seus empréstimos de forma simples e eficiente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Consulta de Acervo</h3>
              <p className="text-sm text-muted-foreground">Busque por título, autor, ISBN ou palavras-chave</p>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                <GraduationCap className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Gestão Acadêmica</h3>
              <p className="text-sm text-muted-foreground">Controle seus empréstimos e histórico</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">© 2025 Universidade Tecnológica Federal do Paraná</div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Sistema de Biblioteca</h1>
                <p className="text-sm text-muted-foreground">UTFPR</p>
              </div>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
