"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, BookOpen, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface HistoricoItem {
  id: number
  titulo: string
  codigo: string
  dataRetirada: string
  dataDevolucao: string
  dataRealDevolucao?: string
  status: "devolvido" | "atraso" | "multa_paga" | "ativo"
  multa?: number
  renovacoes: number
}

const mockHistorico: HistoricoItem[] = [
  {
    id: 1,
    titulo: "Algoritmos e Estruturas de Dados",
    codigo: "EX001",
    dataRetirada: "2025-01-15",
    dataDevolucao: "2025-01-25",
    status: "ativo",
    renovacoes: 0,
  },
  {
    id: 2,
    titulo: "Engenharia de Software",
    codigo: "EX045",
    dataRetirada: "2025-01-10",
    dataDevolucao: "2025-01-20",
    status: "atraso",
    renovacoes: 1,
  },
  {
    id: 3,
    titulo: "Programação Orientada a Objetos",
    codigo: "EX023",
    dataRetirada: "2024-12-15",
    dataDevolucao: "2024-12-25",
    dataRealDevolucao: "2024-12-24",
    status: "devolvido",
    renovacoes: 0,
  },
  {
    id: 4,
    titulo: "Banco de Dados Relacionais",
    codigo: "EX078",
    dataRetirada: "2024-12-01",
    dataDevolucao: "2024-12-11",
    dataRealDevolucao: "2024-12-16",
    status: "multa_paga",
    multa: 15.5,
    renovacoes: 0,
  },
  {
    id: 5,
    titulo: "Redes de Computadores",
    codigo: "EX156",
    dataRetirada: "2024-11-20",
    dataDevolucao: "2024-11-30",
    dataRealDevolucao: "2024-11-29",
    status: "devolvido",
    renovacoes: 1,
  },
  {
    id: 6,
    titulo: "Sistemas Operacionais",
    codigo: "EX089",
    dataRetirada: "2024-11-05",
    dataDevolucao: "2024-11-15",
    dataRealDevolucao: "2024-11-18",
    status: "multa_paga",
    multa: 9.0,
    renovacoes: 0,
  },
]

export function HistoricoEmprestimos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [filteredItems, setFilteredItems] = useState<HistoricoItem[]>(mockHistorico)

  const handleFilter = () => {
    let filtered = mockHistorico

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    setFilteredItems(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "devolvido":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Devolvido
          </Badge>
        )
      case "ativo":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            Ativo
          </Badge>
        )
      case "atraso":
        return <Badge variant="destructive">Em Atraso</Badge>
      case "multa_paga":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
          >
            Multa Paga
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "devolvido":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "ativo":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "atraso":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "multa_paga":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const calcularDiasAtraso = (dataDevolucao: string, dataRealDevolucao?: string) => {
    const devolucaoPrevista = new Date(dataDevolucao)
    const devolucaoReal = dataRealDevolucao ? new Date(dataRealDevolucao) : new Date()
    const diffTime = devolucaoReal.getTime() - devolucaoPrevista.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const estatisticas = {
    totalEmprestimos: mockHistorico.length,
    emprestimosAtivos: mockHistorico.filter((item) => item.status === "ativo").length,
    emprestimosDevolvidos: mockHistorico.filter((item) => item.status === "devolvido").length,
    multasPagas: mockHistorico.filter((item) => item.status === "multa_paga").length,
    totalMultas: mockHistorico.reduce((total, item) => total + (item.multa || 0), 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Histórico de Empréstimos</h2>
        <p className="text-muted-foreground">Visualize todo o histórico dos seus empréstimos na biblioteca</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{estatisticas.emprestimosDevolvidos}</p>
                <p className="text-xs text-muted-foreground">Devolvidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{estatisticas.multasPagas}</p>
                <p className="text-xs text-muted-foreground">Com Multa</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">R$</span>
              <div>
                <p className="text-2xl font-bold text-red-600">{estatisticas.totalMultas.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Multas Pagas</p>
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
            Filtrar Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por título ou código..."
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
                <SelectItem value="devolvido">Devolvidos</SelectItem>
                <SelectItem value="atraso">Em atraso</SelectItem>
                <SelectItem value="multa_paga">Multa paga</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilter}>Filtrar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista do Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico Completo</CardTitle>
          <CardDescription>
            {filteredItems.length} {filteredItems.length === 1 ? "empréstimo encontrado" : "empréstimos encontrados"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum empréstimo encontrado</h3>
              <p className="text-muted-foreground text-center">Tente ajustar os filtros ou termos de busca</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.titulo}</h3>
                      <p className="text-sm text-muted-foreground">Exemplar: {item.codigo}</p>
                      <div className="flex items-center gap-6 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Retirada: {item.dataRetirada}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Devolução prevista: {item.dataDevolucao}</span>
                        </div>
                        {item.dataRealDevolucao && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Devolvido em: {item.dataRealDevolucao}</span>
                          </div>
                        )}
                      </div>
                      {item.renovacoes > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          Renovado {item.renovacoes} {item.renovacoes === 1 ? "vez" : "vezes"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {getStatusBadge(item.status)}
                      {item.multa && <p className="text-sm text-red-600 mt-1">Multa: R$ {item.multa.toFixed(2)}</p>}
                      {(item.status === "atraso" || (item.status === "multa_paga" && item.dataRealDevolucao)) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {calcularDiasAtraso(item.dataDevolucao, item.dataRealDevolucao)} dias de atraso
                        </p>
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
