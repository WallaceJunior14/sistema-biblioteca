"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, BarChart3, LogOut, UserPlus, BookPlus, Clock, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { CadastrarAssociado } from "@/components/cadastrar-associado"
import { CadastrarItem } from "@/components/cadastrar-item"
import { GerenciarEmprestimos } from "@/components/gerenciar-emprestimos"

export function BibliotecarioDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/")
  }

  const mockStats = {
    totalLivros: 15420,
    totalRevistas: 3280,
    emprestimosAtivos: 847,
    associados: 2156,
    emprestimosHoje: 23,
    devolucoesPendentes: 156,
    multasPendentes: 45,
  }

  const mockEmprestimosRecentes = [
    {
      id: 1,
      associado: "João Silva (2024001)",
      livro: "Algoritmos e Estruturas de Dados",
      data: "2025-01-15",
      status: "ativo",
    },
    {
      id: 2,
      associado: "Maria Santos (2024002)",
      livro: "Engenharia de Software",
      data: "2025-01-15",
      status: "ativo",
    },
  ]

  const mockListaEspera = [
    {
      id: 1,
      item: "Algoritmos e Estruturas de Dados",
      associados: ["Pedro Costa (2024003)", "Ana Lima (2024004)"],
    },
    {
      id: 2,
      item: "Banco de Dados Relacionais",
      associados: ["Carlos Silva (2024005)"],
    },
  ]

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
            <p className="text-sm text-muted-foreground">Bibliotecário</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeSection === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("overview")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Visão Geral
          </Button>
          <Button
            variant={activeSection === "cadastrar-associado" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("cadastrar-associado")}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Associado
          </Button>
          <Button
            variant={activeSection === "cadastrar-item" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("cadastrar-item")}
          >
            <BookPlus className="w-4 h-4 mr-2" />
            Cadastrar Livro/Revista
          </Button>
          <Button
            variant={activeSection === "gerenciar-emprestimos" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("gerenciar-emprestimos")}
          >
            <Clock className="w-4 h-4 mr-2" />
            Gerenciar Empréstimos
          </Button>
          <Button
            variant={activeSection === "lista-espera" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("lista-espera")}
          >
            <Users className="w-4 h-4 mr-2" />
            Lista de Espera
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
              <h2 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h2>
              <p className="text-muted-foreground">Bem-vindo, Ana Costa | Bibliotecária Chefe</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalLivros.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12 este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.emprestimosAtivos}</div>
                  <p className="text-xs text-muted-foreground">+{mockStats.emprestimosHoje} hoje</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Associados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.associados.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8 este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Multas Pendentes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{mockStats.multasPendentes}</div>
                  <p className="text-xs text-muted-foreground">{mockStats.devolucoesPendentes} devoluções pendentes</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse as funcionalidades mais utilizadas</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex-col gap-2" onClick={() => setActiveSection("cadastrar-associado")}>
                  <UserPlus className="w-6 h-6" />
                  Novo Associado
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => setActiveSection("cadastrar-item")}
                >
                  <BookPlus className="w-6 h-6" />
                  Novo Livro/Revista
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => setActiveSection("gerenciar-emprestimos")}
                >
                  <Clock className="w-6 h-6" />
                  Gerenciar Empréstimos
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Empréstimos Recentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEmprestimosRecentes.map((emprestimo) => (
                    <div key={emprestimo.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{emprestimo.associado}</p>
                        <p className="text-xs text-muted-foreground">{emprestimo.livro}</p>
                        <p className="text-xs text-muted-foreground">{emprestimo.data}</p>
                      </div>
                      <Badge variant="secondary">Ativo</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">156 devoluções pendentes</p>
                      <p className="text-xs text-muted-foreground">Verificar empréstimos em atraso</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">23 empréstimos hoje</p>
                      <p className="text-xs text-muted-foreground">Movimento normal para esta data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "cadastrar-associado" && <CadastrarAssociado />}
        {activeSection === "cadastrar-item" && <CadastrarItem />}
        {activeSection === "gerenciar-emprestimos" && <GerenciarEmprestimos />}

        {activeSection === "lista-espera" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Lista de Espera</h2>
              <p className="text-muted-foreground">Gerencie as listas de espera dos itens do acervo</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Itens com Lista de Espera</CardTitle>
                <CardDescription>
                  {mockListaEspera.length} {mockListaEspera.length === 1 ? "item possui" : "itens possuem"} lista de
                  espera
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockListaEspera.map((item) => (
                  <div key={item.id} className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium mb-2">{item.item}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.associados.length} {item.associados.length === 1 ? "pessoa na" : "pessoas na"} lista de
                      espera
                    </p>
                    <div className="space-y-2">
                      {item.associados.map((associado, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">
                            {index + 1}. {associado}
                          </span>
                          <Button size="sm" variant="outline">
                            Notificar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
