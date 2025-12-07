'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { User, Mail, Lock } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await register(formData)
      router.push('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
          <User className="text-purple-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-600 mt-2">Join us today</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          icon={User}
          type="text"
          placeholder="johndoe"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          label="Username"
          required
        />

        <Input
          icon={Mail}
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          label="Email"
          required
        />

        <Input
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          label="Password"
          required
        />

        <Button type="submit" loading={loading} className="w-full bg-purple-600 hover:bg-purple-700">
          Create Account
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-purple-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}