import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
          <Shield className="text-white" size={48} />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to SecureAuth</h1>
        <p className="text-xl text-gray-600 mb-8">Two-Factor Authentication Made Simple</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Login
          </Link>
          <Link href="/register" className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
            Register
          </Link>
        </div>
      </div>
    </main>
  )
}