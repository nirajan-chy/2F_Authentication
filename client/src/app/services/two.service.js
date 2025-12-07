import { apiRequest } from './api'

export async function enable2FA() {
  return apiRequest('/2fa/enable', {
    method: 'POST',
  })
}

export async function verify2FA(data) {
  return apiRequest('/2fa/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function verifyBackupCode(data) {
  return apiRequest('/2fa/verify-backup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
