'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Shield, User, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleSetup2FA = () => {
    router.push('/setup-2fa')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Shield className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.username || 'User'}!</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Account Information</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">
                    {user?.twoFactorEnabled ? 'Enabled' : 'Not enabled'}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.twoFactorEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {user?.twoFactorEnabled ? 'Active' : 'Inactive'}
              </div>
            </div>

            {!user?.twoFactorEnabled && (
              <Button onClick={handleSetup2FA} className="w-full bg-green-600 hover:bg-green-700">
                <Shield size={20} className="mr-2" />
                Enable 2FA
              </Button>
            )}

            <Button onClick={handleLogout} className="w-full bg-gray-600 hover:bg-gray-700">
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
