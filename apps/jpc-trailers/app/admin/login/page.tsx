'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="max-w-[400px] w-full border border-[#1E1E1E] bg-[#0D0D0D] p-8 lg:p-12">
        <div className="mb-8">
          <SectionLabel index="ADMIN" label="PORTAL ACCESS" className="mb-4" />
          <h1 className="text-3xl font-extrabold text-[#F0F0F0] font-syne uppercase">SYSTEM LOGIN</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-[#6A6A6A] uppercase tracking-widest mb-2 font-mono">Operator Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-sm bg-[#111111] border border-[#1E1E1E] text-[#F0F0F0] focus:outline-none focus:border-[#E8500A] transition-colors"
              placeholder="admin@jpctrailers.co.uk"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-[#6A6A6A] uppercase tracking-widest mb-2 font-mono">Access Token</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-sm bg-[#111111] border border-[#1E1E1E] text-[#F0F0F0] focus:outline-none focus:border-[#E8500A] transition-colors"
            />
          </div>

          {error && <p className="text-[#E8500A] text-[10px] font-mono uppercase">{error}</p>}

          <Button type="submit" variant="solid" className="w-full" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Enter System →'}
          </Button>
        </form>
      </div>
    </main>
  )
}
