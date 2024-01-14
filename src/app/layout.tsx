'use client'

import { store } from '@/redux/store'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from 'react-redux'
// import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReduxProvider>
  )
}
