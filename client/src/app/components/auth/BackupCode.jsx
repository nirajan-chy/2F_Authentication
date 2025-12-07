'use client'
import { Copy } from 'lucide-react'

export default function BackupCodes({ codes }) {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <p className="text-sm font-medium text-yellow-800 mb-3">
        ⚠️ Save these backup codes safely:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {codes.map((code, i) => (
          <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded border border-yellow-200">
            <span className="text-sm font-mono">{code}</span>
            <button 
              onClick={() => copyCode(code)} 
              className="text-yellow-600 hover:text-yellow-700"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
