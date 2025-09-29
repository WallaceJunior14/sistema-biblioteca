"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Clock, CheckCircle, AlertTriangle, BookOpen, Calendar } from "lucide-react"

interface EmprestimoGerencial {
  id: number
  associado: {
    codigo: string
    nome: string
    email: string
    tipo: string
  }
  item: {
    titulo: string
    codigo: string
    tipo: "livro" | "revista"
  }
  dataRetirada: string
  dataDevolucao: string
  status: "ativo" | "atraso" | "devolvido"
  diasAtraso?: number
  multa?: number
  renovacoes: number
}

const mockEmprestimos: EmprestimoGerencial[] = [
  {
    id: 1,
    associado: {
      codigo: "2024001",
      nome: "João Silva",
      email: "joao.silva@aluno.utfpr.edu.br",
      tipo: "Estudante",
    },
    item: {
      titulo: "Algoritmos e Estruturas de Dados",
      codigo: "EX001",
      tipo: "livro",
    },
    dataRetirada: "2025-01-15",
    dataDevolucao: "2025-01-25",
    status: "ativo",
    renovacoes: 0,
  },
  {
    id: 2,
    associado: {
      codigo: "2024002",
      nome: "Maria Santos",
      email: "maria.santos@aluno.utfpr.edu.br",
      tipo: "Estudante",
    },
    item: {
      titulo: "Engenharia de Software",
      codigo: "EX045",
      tipo: "livro",
    },
    dataRetirada: "2025-01-10",
    dataDevolucao: "2025-01-20",
    status: "atraso",
    diasAtraso: 2,
    multa: 6.0,
    renovacoes: 1,
  },
  {
    id: 3,
    associado: {
      codigo: "PROF001",
      nome: "Dr. Carlos Oliveira",
      email: "carlos.oliveira@utfpr.edu.br",
      tipo: "Professor",
    },
    item: {
      titulo: "IEEE Computer",
      codigo: "REV001",
      tipo: "revista",
    },
    dataRetirada: "2025-01-12",
    dataDevolucao: "2025-01-22",
    status: "ativo",
    renovacoes: 0,
  },
]

export function GerenciarEmprestimos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [filteredEmprestimos, setFilteredEmprestimos] = useState<EmprestimoGerencial[]>(mockEmprestimos)
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<EmprestimoGerencial | null>(null)

  const handleFilter = () => {
    let filtered = mockEmprestimos

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (emp) =>
          emp.associado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.associado.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.item.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((emp) => emp.status === statusFilter)
    }

    setFilteredEmprestimos(filtered)
  }

  const handleDevolucao = (emprestimo: EmprestimoGerencial) => {
    const hoje = new Date()
    const dataDevolucao = new Date(emprestimo.dataDevolucao)
    const diasAtraso = Math.max(0, Math.ceil((hoje.getTime() - dataDevolucao.getTime()) / (1000 * 60 * 60 * 24)))
    const multa = diasAtraso * 3.0

    if (diasAtraso > 0) {
      alert(
        `Devolução registrada com atraso!\nDias de atraso: ${diasAtraso}\nMulta: R$ ${multa.toFixed(2)}\n\nAssociado: ${emprestimo.associado.nome}\nItem: ${emprestimo.item.titulo}`,
      )
    } else {
      alert(
        `Devolução registrada com sucesso!\n\nAssociado: ${emprestimo.associado.nome}\nItem: ${emprestimo.item.titulo}`,
      )
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            Ativo
          </Badge>
        )
      case "atraso":
        return <Badge variant="destructive">Em Atraso</Badge>
      case "devolvido":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Devolvido
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "atraso":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "devolvido":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const estatisticas = {
    totalEmprestimos: mockEmprestimos.length,
    emprestimosAtivos: mockEmprestimos.filter((emp) => emp.status === "ativo").length,
    emprestimosAtraso: mockEmprestimos.filter((emp) => emp.status === "atraso").length,
    multasPendentes: mockEmprestimos.reduce((total, emp) => total + (emp.multa || 0), 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Gerenciar Empréstimos</h2>
        <p className="text-muted-foreground">Controle e gerencie todos os empréstimos da biblioteca</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{estatisticas.totalEmprestimos}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{estatisticas.emprestimosAtivos}</p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{estatisticas.emprestimosAtraso}</p>
                <p className="text-xs text-muted-foreground">Em Atraso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">R$</span>
              <div>
                <p className="text-2xl font-bold text-red-600">{estatisticas.multasPendentes.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Multas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filtrar Empréstimos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por associado, código ou item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleFilter()}
                className="bg-input border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="atraso">Em atraso</SelectItem>
                <SelectItem value="devolvido">Devolvidos</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilter}>Filtrar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Empréstimos */}
      <Card>
        <CardHeader>
          <CardTitle>Empréstimos</CardTitle>
          <CardDescription>
            {filteredEmprestimos.length}{" "}
            {filteredEmprestimos.length === 1 ? "empréstimo encontrado" : "empréstimos encontrados"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEmprestimos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum empréstimo encontrado</h3>
              <p className="text-muted-foreground text-center">Tente ajustar os filtros ou termos de busca</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEmprestimos.map((emprestimo) => (
                <div
                  key={emprestimo.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(emprestimo.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{emprestimo.item.titulo}</h3>
                        <Badge variant="outline" className="text-xs">
                          {emprestimo.item.tipo === "livro" ? "Livro" : "Revista"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Exemplar: {emprestimo.item.codigo} | Associado: {emprestimo.associado.nome} (
                        {emprestimo.associado.codigo})
                      </p>
                      <div className="flex items-center gap-6 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Retirada: {emprestimo.dataRetirada}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Devolução: {emprestimo.dataDevolucao}</span>
                        </div>
                        {emprestimo.renovacoes > 0 && (
                          <span className="text-blue-600">
                            Renovado {emprestimo.renovacoes} {emprestimo.renovacoes === 1 ? "vez" : "vezes"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {getStatusBadge(emprestimo.status)}
                      {emprestimo.multa && (
                        <p className="text-sm text-red-600 mt-1">Multa: R$ {emprestimo.multa.toFixed(2)}</p>
                      )}
                      {emprestimo.diasAtraso && (
                        <p className="text-xs text-muted-foreground mt-1">{emprestimo.diasAtraso} dias de atraso</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedEmprestimo(emprestimo)}>
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes do Empréstimo</DialogTitle>
                            <DialogDescription>Informações completas sobre o empréstimo</DialogDescription>
                          </DialogHeader>
                          {selectedEmprestimo && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Associado</h4>
                                  <p className="text-sm">{selectedEmprestimo.associado.nome}</p>
                                  <p className="text-xs text-muted-foreground">{selectedEmprestimo.associado.codigo}</p>
                                  <p className="text-xs text-muted-foreground">{selectedEmprestimo.associado.email}</p>
                                  <p className="text-xs text-muted-foreground">{selectedEmprestimo.associado.tipo}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Item</h4>
                                  <p className="text-sm">{selectedEmprestimo.item.titulo}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Código: {selectedEmprestimo.item.codigo}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Tipo: {selectedEmprestimo.item.tipo}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Datas</h4>
                                  <p className="text-sm">Retirada: {selectedEmprestimo.dataRetirada}</p>
                                  <p className="text-sm">Devolução: {selectedEmprestimo.dataDevolucao}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Status</h4>
                                  {getStatusBadge(selectedEmprestimo.status)}
                                  {selectedEmprestimo.multa && (
                                    <p className="text-sm text-red-600 mt-1">
                                      Multa: R$ {selectedEmprestimo.multa.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {emprestimo.status !== "devolvido" && (
                        <Button size="sm" onClick={() => handleDevolucao(emprestimo)}>
                          Registrar Devolução
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
