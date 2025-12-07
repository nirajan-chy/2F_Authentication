'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import QRCodeBox from '@/components/auth/QRCodeBox'
import BackupCodes from '@/components/auth/BackupCodes'
import OtpInput from '@/components/auth/OtpInput'
import Button from '@/components/ui/Button'
import { enable2FA, verify2FA } from '@/services/twofa.service'
import { Shield } from 'lucide-react'

export default function Setup2FAPage() {
  const [qrCode, setQrCode] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadQRCode()
  }, [])

  const loadQRCode = async () => {
    try {
      const data = await enable2FA()
      setQrCode(data.qrCode)
      setBackupCodes(data.backupCodes || [])
    } catch (err) {
      setError('Failed to generate QR code')
    }
  }

  const handleVerify = async () => {
    if (otp.length !== 6) return
    
    setLoading(true)
    setError('')
    
    try {
      await verify2FA({ otp })
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid OTP code')
      setOtp('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <Shield className="text-green-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Setup 2FA</h1>
        <p className="text-gray-600 mt-2">Scan this QR code with your authenticator app</p>
      </div>

      {qrCode && <QRCodeBox qrCode={qrCode} />}
      
      {backupCodes.length > 0 && <BackupCodes codes={backupCodes} />}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter code to verify
        </label>
        <OtpInput value={otp} onChange={setOtp} />
        <Button onClick={handleVerify} loading={loading} className="w-full mt-4 bg-green-600 hover:bg-green-700">
          Complete Setup
        </Button>
      </div>
    </div>
  )
}
