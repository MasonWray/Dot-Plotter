'use client'

import { ImportImageDialog } from '@/components/dialogs/ImportImageDialog'
import { store } from '@/redux/store'
import { OverlaysProvider } from '@blueprintjs/core'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <OverlaysProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <ImportImageDialog />
          </body>
        </html>
      </OverlaysProvider>
    </ReduxProvider>
  )
}
