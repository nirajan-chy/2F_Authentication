'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import OtpInput from '@/components/auth/OtpInput'
import Button from '@/components/ui/Button'
import { verify2FA, verifyBackupCode } from '@/services/twofa.service'
import { Smartphone, Key } from 'lucide-react'

export default function Verify2FAPage() {
  const [otp, setOtp] = useState('')
  const [useBackup, setUseBackup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const router = useRouter()

  const handleVerify = async () => {
    if (otp.length < 6) return
    
    setLoading(true)
    setError('')
    
    try {
      const data = useBackup 
        ? await verifyBackupCode({ backupCode: otp })
        : await verify2FA({ otp })
      
      setUser(data.user)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid code')
      setOtp('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          {useBackup ? <Key className="text-green-600" size={32} /> : <Smartphone className="text-green-600" size={32} />}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Two-Factor Authentication</h1>
        <p className="text-gray-600 mt-2">
          {useBackup ? 'Enter a backup code' : 'Enter the code from your authenticator app'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <OtpInput value={otp} onChange={setOtp} length={useBackup ? 12 : 6} />

      <Button onClick={handleVerify} loading={loading} className="w-full mt-4 bg-green-600 hover:bg-green-700">
        Verify
      </Button>

      <button
        onClick={() => setUseBackup(!useBackup)}
        className="w-full mt-4 text-green-600 text-sm hover:underline"
      >
        {useBackup ? 'Use authenticator code' : 'Use backup code instead'}
      </button>
    </div>
  )
}
