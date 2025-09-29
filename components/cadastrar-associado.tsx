"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Save, RotateCcw } from "lucide-react"

interface AssociadoForm {
  codigo: string
  nome: string
  email: string
  telefone: string
  curso: string
  endereco: {
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    cep: string
  }
  tipo: "estudante" | "professor" | "funcionario"
}

export function CadastrarAssociado() {
  const [formData, setFormData] = useState<AssociadoForm>({
    codigo: "",
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    endereco: {
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "Ponta Grossa",
      cep: "",
    },
    tipo: "estudante",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("endereco.")) {
      const enderecoField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert(`Associado ${formData.nome} cadastrado com sucesso!\nCódigo: ${formData.codigo || "AUTO-" + Date.now()}`)

    // Reset form
    setFormData({
      codigo: "",
      nome: "",
      email: "",
      telefone: "",
      curso: "",
      endereco: {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "Ponta Grossa",
        cep: "",
      },
      tipo: "estudante",
    })

    setIsLoading(false)
  }

  const handleReset = () => {
    setFormData({
      codigo: "",
      nome: "",
      email: "",
      telefone: "",
      curso: "",
      endereco: {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "Ponta Grossa",
        cep: "",
      },
      tipo: "estudante",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Cadastrar Associado</h2>
        <p className="text-muted-foreground">Registre um novo associado no sistema da biblioteca</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Informações Básicas
            </CardTitle>
            <CardDescription>Dados pessoais e de identificação do associado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código do Associado</Label>
                <Input
                  id="codigo"
                  placeholder="Deixe vazio para gerar automaticamente"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Associado *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudante">Estudante</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                placeholder="Digite o nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@utfpr.edu.br"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  placeholder="(42) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="curso">Curso/Departamento</Label>
              <Input
                id="curso"
                placeholder="Ex: Ciência da Computação, Engenharia Civil, etc."
                value={formData.curso}
                onChange={(e) => handleInputChange("curso", e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>Informações de endereço para contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="rua">Rua/Avenida *</Label>
                <Input
                  id="rua"
                  placeholder="Nome da rua ou avenida"
                  value={formData.endereco.rua}
                  onChange={(e) => handleInputChange("endereco.rua", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  placeholder="123"
                  value={formData.endereco.numero}
                  onChange={(e) => handleInputChange("endereco.numero", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  placeholder="Apto, casa, etc."
                  value={formData.endereco.complemento}
                  onChange={(e) => handleInputChange("endereco.complemento", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  placeholder="Nome do bairro"
                  value={formData.endereco.bairro}
                  onChange={(e) => handleInputChange("endereco.bairro", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  value={formData.endereco.cidade}
                  onChange={(e) => handleInputChange("endereco.cidade", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  placeholder="84000-000"
                  value={formData.endereco.cep}
                  onChange={(e) => handleInputChange("endereco.cep", e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Cadastrando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Cadastrar Associado
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar Formulário
          </Button>
        </div>
      </form>
    </div>
  )
}
