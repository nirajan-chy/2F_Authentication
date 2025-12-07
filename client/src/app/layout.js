import './globals.css'
import { AuthProvider } from './context/AuthContext';


export const metadata = {
  title: '2FA Authentication App',
  description: 'Secure authentication with 2FA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
