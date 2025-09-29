"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Clock, History, AlertTriangle, LogOut, User, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { ConsultaAcervo } from "@/components/consulta-acervo"
import { HistoricoEmprestimos } from "@/components/historico-emprestimos"

export function AssociadoDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/")
  }

  const mockEmprestimos = [
    {
      id: 1,
      titulo: "Algoritmos e Estruturas de Dados",
      codigo: "EX001",
      dataRetirada: "2025-01-15",
      dataDevolucao: "2025-01-25",
      status: "normal",
      diasRestantes: 3,
      renovacoes: 0,
      maxRenovacoes: 2,
    },
    {
      id: 2,
      titulo: "Engenharia de Software",
      codigo: "EX045",
      dataRetirada: "2025-01-10",
      dataDevolucao: "2025-01-20",
      status: "atraso",
      diasAtraso: 2,
      renovacoes: 1,
      maxRenovacoes: 2,
    },
  ]

  const mockMultas = [
    {
      id: 1,
      titulo: "Banco de Dados Relacionais",
      valor: 15.5,
      diasAtraso: 5,
      dataVencimento: "2025-01-30",
    },
  ]

  const handleRenovarEmprestimo = (id: number) => {
    alert(`Renovação solicitada para o empréstimo ID: ${id}`)
  }

  const handlePagarMulta = (id: number) => {
    alert(`Redirecionando para pagamento da multa ID: ${id}`)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Biblioteca UTFPR</h1>
            <p className="text-sm text-muted-foreground">Associado</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeSection === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("overview")}
          >
            <User className="w-4 h-4 mr-2" />
            Visão Geral
          </Button>
          <Button
            variant={activeSection === "acervo" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("acervo")}
          >
            <Search className="w-4 h-4 mr-2" />
            Consultar Acervo
          </Button>
          <Button
            variant={activeSection === "emprestimos" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("emprestimos")}
          >
            <Clock className="w-4 h-4 mr-2" />
            Meus Empréstimos
          </Button>
          <Button
            variant={activeSection === "historico" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("historico")}
          >
            <History className="w-4 h-4 mr-2" />
            Histórico
          </Button>
        </nav>

        <div className="mt-auto pt-6">
          <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeSection === "overview" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, João Silva</h2>
              <p className="text-muted-foreground">Código: 2024001 | Curso: Ciência da Computação</p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">de 3 permitidos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximas Devoluções</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">em 3 dias</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Multas Pendentes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">R$ 15,50</div>
                  <p className="text-xs text-muted-foreground">1 item em atraso</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse as funcionalidades mais utilizadas</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 flex-col gap-2" onClick={() => setActiveSection("acervo")}>
                  <Search className="w-6 h-6" />
                  Buscar Livros
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => setActiveSection("emprestimos")}
                >
                  <Clock className="w-6 h-6" />
                  Ver Empréstimos
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Empréstimo realizado</p>
                    <p className="text-xs text-muted-foreground">Algoritmos e Estruturas de Dados - há 2 dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Devolução realizada</p>
                    <p className="text-xs text-muted-foreground">Programação Orientada a Objetos - há 1 semana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "emprestimos" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Meus Empréstimos</h2>
              <p className="text-muted-foreground">Gerencie seus empréstimos ativos</p>
            </div>

            {/* Multas Alert */}
            {mockMultas.length > 0 && (
              <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Multas Pendentes
                  </CardTitle>
                  <CardDescription>
                    Você possui multas pendentes que devem ser pagas para continuar fazendo empréstimos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockMultas.map((multa) => (
                    <div key={multa.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{multa.titulo}</p>
                        <p className="text-sm text-muted-foreground">{multa.diasAtraso} dias de atraso</p>
                        <p className="text-xs text-muted-foreground">Vencimento: {multa.dataVencimento}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-destructive text-lg">R$ {multa.valor.toFixed(2)}</p>
                        </div>
                        <Button size="sm" onClick={() => handlePagarMulta(multa.id)}>
                          Pagar Multa
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Empréstimos Ativos */}
            <Card>
              <CardHeader>
                <CardTitle>Empréstimos Ativos</CardTitle>
                <CardDescription>Você tem {mockEmprestimos.length} empréstimos ativos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEmprestimos.map((emprestimo) => (
                  <div
                    key={emprestimo.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{emprestimo.titulo}</h3>
                      <p className="text-sm text-muted-foreground">Exemplar: {emprestimo.codigo}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Retirada: {emprestimo.dataRetirada}</span>
                        <span>Devolução: {emprestimo.dataDevolucao}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs">
                        {emprestimo.status === "normal" ? (
                          <span className="text-blue-600">{emprestimo.diasRestantes} dias restantes</span>
                        ) : (
                          <span className="text-red-600">{emprestimo.diasAtraso} dias de atraso</span>
                        )}
                        <span className="text-muted-foreground">
                          Renovações: {emprestimo.renovacoes}/{emprestimo.maxRenovacoes}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={emprestimo.status === "normal" ? "secondary" : "destructive"}>
                        {emprestimo.status === "normal" ? "Normal" : "Em Atraso"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={emprestimo.renovacoes >= emprestimo.maxRenovacoes}
                        onClick={() => handleRenovarEmprestimo(emprestimo.id)}
                      >
                        {emprestimo.renovacoes >= emprestimo.maxRenovacoes ? "Limite atingido" : "Renovar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Informações sobre Empréstimos */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Cada associado pode ter no máximo 3 empréstimos simultâneos</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Período de empréstimo: 10 dias corridos</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Cada item pode ser renovado até 2 vezes, desde que não haja reservas</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Multa por atraso: R$ 3,00 por dia, por item</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Associados com multas pendentes não podem fazer novos empréstimos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "acervo" && <ConsultaAcervo />}

        {activeSection === "historico" && <HistoricoEmprestimos />}
      </div>
    </div>
  )
}
