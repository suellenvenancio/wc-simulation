"use client"
import { Button } from "@/components/button"
import { useAuth } from "@/context/auth" // Importe o seu contexto
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/")
    } catch (err: unknown) {
      console.log(err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col glass-card w-full h-screen items-center justify-center gap-2">
      <h1 className="text-2xl font-bold mb-6">Login Page</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm px-4">
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <input
          type="email"
          placeholder="E-mail"
          className="border p-4 rounded-2xl mb-4 w-full text-neon"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-4 rounded-2xl mb-4 w-full text-neon"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          name={loading ? "Carregando..." : "Login"}
          className="w-full p-4 text-xl font-bold"
          disabled={loading}
        />
      </form>
    </div>
  )
}
