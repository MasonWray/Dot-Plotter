'use client'

import { store } from '@/redux/store'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider>
            <ReduxProvider store={store}>
              {children}
            </ReduxProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
