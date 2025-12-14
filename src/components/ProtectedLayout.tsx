'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { method: 'GET' })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
