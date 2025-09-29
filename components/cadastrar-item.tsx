"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookPlus, Save, RotateCcw, BookOpen, Calendar } from "lucide-react"

interface LivroForm {
  titulo: string
  autores: string
  editora: string
  local: string
  isbn: string
  palavrasChave: string
  numeroExemplares: number
}

interface RevistaForm {
  titulo: string
  dataEdicao: string
  numeroExemplares: number
}

export function CadastrarItem() {
  const [tipoItem, setTipoItem] = useState<"livro" | "revista">("livro")
  const [isLoading, setIsLoading] = useState(false)

  const [livroForm, setLivroForm] = useState<LivroForm>({
    titulo: "",
    autores: "",
    editora: "",
    local: "",
    isbn: "",
    palavrasChave: "",
    numeroExemplares: 1,
  })

  const [revistaForm, setRevistaForm] = useState<RevistaForm>({
    titulo: "",
    dataEdicao: "",
    numeroExemplares: 1,
  })

  const handleLivroChange = (field: keyof LivroForm, value: string | number) => {
    setLivroForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRevistaChange = (field: keyof RevistaForm, value: string | number) => {
    setRevistaForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (tipoItem === "livro") {
      alert(
        `Livro "${livroForm.titulo}" cadastrado com sucesso!\n${livroForm.numeroExemplares} exemplares adicionados ao acervo.`,
      )
      setLivroForm({
        titulo: "",
        autores: "",
        editora: "",
        local: "",
        isbn: "",
        palavrasChave: "",
        numeroExemplares: 1,
      })
    } else {
      alert(
        `Revista "${revistaForm.titulo}" cadastrada com sucesso!\n${revistaForm.numeroExemplares} exemplares adicionados ao acervo.`,
      )
      setRevistaForm({
        titulo: "",
        dataEdicao: "",
        numeroExemplares: 1,
      })
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    if (tipoItem === "livro") {
      setLivroForm({
        titulo: "",
        autores: "",
        editora: "",
        local: "",
        isbn: "",
        palavrasChave: "",
        numeroExemplares: 1,
      })
    } else {
      setRevistaForm({
        titulo: "",
        dataEdicao: "",
        numeroExemplares: 1,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Cadastrar Livro/Revista</h2>
        <p className="text-muted-foreground">Adicione novos itens ao acervo da biblioteca</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookPlus className="w-5 h-5" />
            Novo Item do Acervo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tipoItem} onValueChange={(value) => setTipoItem(value as "livro" | "revista")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="livro" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Livro
              </TabsTrigger>
              <TabsTrigger value="revista" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Revista
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="livro" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo-livro">Título *</Label>
                  <Input
                    id="titulo-livro"
                    placeholder="Digite o título do livro"
                    value={livroForm.titulo}
                    onChange={(e) => handleLivroChange("titulo", e.target.value)}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autores">Autores *</Label>
                  <Textarea
                    id="autores"
                    placeholder="Digite os nomes dos autores separados por vírgula"
                    value={livroForm.autores}
                    onChange={(e) => handleLivroChange("autores", e.target.value)}
                    required
                    className="bg-input border-border min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">Exemplo: João Silva, Maria Santos, Pedro Oliveira</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editora">Editora *</Label>
                    <Input
                      id="editora"
                      placeholder="Nome da editora"
                      value={livroForm.editora}
                      onChange={(e) => handleLivroChange("editora", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="local">Local de Edição *</Label>
                    <Input
                      id="local"
                      placeholder="Cidade da edição"
                      value={livroForm.local}
                      onChange={(e) => handleLivroChange("local", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      placeholder="978-85-352-3699-6"
                      value={livroForm.isbn}
                      onChange={(e) => handleLivroChange("isbn", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exemplares-livro">Número de Exemplares *</Label>
                    <Input
                      id="exemplares-livro"
                      type="number"
                      min="1"
                      value={livroForm.numeroExemplares}
                      onChange={(e) => handleLivroChange("numeroExemplares", Number.parseInt(e.target.value) || 1)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="palavras-chave">Palavras-chave</Label>
                  <Textarea
                    id="palavras-chave"
                    placeholder="Digite as palavras-chave separadas por vírgula"
                    value={livroForm.palavrasChave}
                    onChange={(e) => handleLivroChange("palavrasChave", e.target.value)}
                    className="bg-input border-border min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Exemplo: algoritmos, programação, estruturas de dados, computação
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="revista" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo-revista">Título da Revista *</Label>
                  <Input
                    id="titulo-revista"
                    placeholder="Digite o título da revista"
                    value={revistaForm.titulo}
                    onChange={(e) => handleRevistaChange("titulo", e.target.value)}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-edicao">Data da Edição *</Label>
                    <Input
                      id="data-edicao"
                      placeholder="Janeiro 2025"
                      value={revistaForm.dataEdicao}
                      onChange={(e) => handleRevistaChange("dataEdicao", e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                    <p className="text-xs text-muted-foreground">Exemplo: Janeiro 2025, Vol. 15 No. 3, etc.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exemplares-revista">Número de Exemplares *</Label>
                    <Input
                      id="exemplares-revista"
                      type="number"
                      min="1"
                      value={revistaForm.numeroExemplares}
                      onChange={(e) => handleRevistaChange("numeroExemplares", Number.parseInt(e.target.value) || 1)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Botões de Ação */}
              <div className="flex gap-4 mt-6">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Cadastrar {tipoItem === "livro" ? "Livro" : "Revista"}
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleReset} className="bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
