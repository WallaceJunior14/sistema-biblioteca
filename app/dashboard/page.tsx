"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AssociadoDashboard } from "@/components/associado-dashboard"
import { BibliotecarioDashboard } from "@/components/bibliotecario-dashboard"

export default function DashboardPage() {
  const [userType, setUserType] = useState<"associado" | "bibliotecario" | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") as "associado" | "bibliotecario" | null

    if (!storedUserType) {
      router.push("/")
      return
    }

    setUserType(storedUserType)
  }, [router])

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {userType === "associado" ? <AssociadoDashboard /> : <BibliotecarioDashboard />}
    </div>
  )
}
