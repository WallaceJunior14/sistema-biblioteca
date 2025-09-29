"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Calendar, MapPin, Users, Clock, CheckCircle, XCircle } from "lucide-react"

interface AcervoItem {
  id: number
  tipo: "livro" | "revista"
  titulo: string
  autores?: string[]
  editora?: string
  local?: string
  isbn?: string
  palavrasChave?: string[]
  dataEdicao?: string
  exemplares: {
    codigo: string
    disponivel: boolean
  }[]
  totalExemplares: number
  exemplaresDisponiveis: number
}

const mockAcervo: AcervoItem[] = [
  {
    id: 1,
    tipo: "livro",
    titulo: "Algoritmos e Estruturas de Dados",
    autores: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest"],
    editora: "Campus",
    local: "Rio de Janeiro",
    isbn: "978-85-352-3699-6",
    palavrasChave: ["algoritmos", "estruturas", "dados", "programação"],
    exemplares: [
      { codigo: "EX001", disponivel: false },
      { codigo: "EX002", disponivel: true },
      { codigo: "EX003", disponivel: true },
    ],
    totalExemplares: 3,
    exemplaresDisponiveis: 2,
  },
  {
    id: 2,
    tipo: "livro",
    titulo: "Engenharia de Software",
    autores: ["Ian Sommerville"],
    editora: "Pearson",
    local: "São Paulo",
    isbn: "978-85-430-0330-6",
    palavrasChave: ["engenharia", "software", "desenvolvimento", "metodologia"],
    exemplares: [
      { codigo: "EX045", disponivel: false },
      { codigo: "EX046", disponivel: false },
    ],
    totalExemplares: 2,
    exemplaresDisponiveis: 0,
  },
  {
    id: 3,
    tipo: "revista",
    titulo: "IEEE Computer",
    dataEdicao: "Janeiro 2025",
    exemplares: [
      { codigo: "REV001", disponivel: true },
      { codigo: "REV002", disponivel: true },
    ],
    totalExemplares: 2,
    exemplaresDisponiveis: 2,
  },
  {
    id: 4,
    tipo: "livro",
    titulo: "Banco de Dados Relacionais",
    autores: ["Ramez Elmasri", "Shamkant B. Navathe"],
    editora: "Addison Wesley",
    local: "Boston",
    isbn: "978-0-13-608620-8",
    palavrasChave: ["banco", "dados", "sql", "relacionais"],
    exemplares: [
      { codigo: "EX078", disponivel: true },
      { codigo: "EX079", disponivel: true },
      { codigo: "EX080", disponivel: false },
    ],
    totalExemplares: 3,
    exemplaresDisponiveis: 2,
  },
  {
    id: 5,
    tipo: "revista",
    titulo: "Communications of the ACM",
    dataEdicao: "Dezembro 2024",
    exemplares: [{ codigo: "REV015", disponivel: false }],
    totalExemplares: 1,
    exemplaresDisponiveis: 0,
  },
]

export function ConsultaAcervo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("todos")
  const [filteredItems, setFilteredItems] = useState<AcervoItem[]>(mockAcervo)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filtered = mockAcervo

    if (searchTerm.trim()) {
      filtered = mockAcervo.filter((item) => {
        const searchLower = searchTerm.toLowerCase()

        // Search in title
        if (item.titulo.toLowerCase().includes(searchLower)) return true

        // Search in authors (for books)
        if (item.autores?.some((autor) => autor.toLowerCase().includes(searchLower))) return true

        // Search in ISBN (for books)
        if (item.isbn?.toLowerCase().includes(searchLower)) return true

        // Search in keywords (for books)
        if (item.palavrasChave?.some((palavra) => palavra.toLowerCase().includes(searchLower))) return true

        // Search in publication date (for magazines)
        if (item.dataEdicao?.toLowerCase().includes(searchLower)) return true

        return false
      })
    }

    // Filter by type
    if (searchType !== "todos") {
      filtered = filtered.filter((item) => item.tipo === searchType)
    }

    setFilteredItems(filtered)
    setIsSearching(false)
  }

  const handleSolicitarEmprestimo = (item: AcervoItem) => {
    alert(`Empréstimo solicitado para: ${item.titulo}`)
  }

  const handleListaEspera = (item: AcervoItem) => {
    alert(`Adicionado à lista de espera: ${item.titulo}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Consultar Acervo</h2>
        <p className="text-muted-foreground">Busque por livros e revistas disponíveis na biblioteca</p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar no Acervo
          </CardTitle>
          <CardDescription>Pesquise por título, autor, ISBN, palavra-chave ou data de edição</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Digite sua busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="bg-input border-border"
              />
            </div>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="livro">Apenas livros</SelectItem>
                <SelectItem value="revista">Apenas revistas</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Resultados da Busca ({filteredItems.length} {filteredItems.length === 1 ? "item" : "itens"})
          </h3>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSearchType("todos")
                setFilteredItems(mockAcervo)
              }}
            >
              Limpar busca
            </Button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
              <p className="text-muted-foreground text-center">
                Tente usar termos diferentes ou verifique a ortografia
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {item.tipo === "livro" ? (
                            <BookOpen className="w-5 h-5 text-primary" />
                          ) : (
                            <Calendar className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{item.titulo}</h4>
                          <Badge variant="secondary" className="mt-1">
                            {item.tipo === "livro" ? "Livro" : "Revista"}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {item.tipo === "livro" ? (
                          <>
                            <div className="space-y-2">
                              {item.autores && (
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Autores:</span>
                                  <span>{item.autores.join(", ")}</span>
                                </div>
                              )}
                              {item.editora && (
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Editora:</span>
                                  <span>{item.editora}</span>
                                </div>
                              )}
                              {item.local && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Local:</span>
                                  <span>{item.local}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              {item.isbn && (
                                <div>
                                  <span className="text-muted-foreground">ISBN:</span>
                                  <span className="ml-2 font-mono text-sm">{item.isbn}</span>
                                </div>
                              )}
                              {item.palavrasChave && (
                                <div>
                                  <span className="text-muted-foreground">Palavras-chave:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.palavrasChave.map((palavra, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {palavra}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            {item.dataEdicao && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Data da edição:</span>
                                <span>{item.dataEdicao}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Exemplares */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Exemplares: {item.exemplaresDisponiveis} disponíveis de {item.totalExemplares} total
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.exemplares.map((exemplar) => (
                            <div
                              key={exemplar.codigo}
                              className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                exemplar.disponivel
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              }`}
                            >
                              {exemplar.disponivel ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <XCircle className="w-3 h-3" />
                              )}
                              {exemplar.codigo}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-6">
                      {item.exemplaresDisponiveis > 0 ? (
                        <Button size="sm" onClick={() => handleSolicitarEmprestimo(item)} className="whitespace-nowrap">
                          Solicitar Empréstimo
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleListaEspera(item)}
                          className="whitespace-nowrap bg-transparent"
                        >
                          Lista de Espera
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
