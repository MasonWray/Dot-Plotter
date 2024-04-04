'use client'

import { ImportImageDialog } from '@/components/dialogs/ImportImageDialog'
import { store } from '@/redux/store'
import { OverlaysProvider } from '@blueprintjs/core'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from 'react-redux'
import { MachineSettingsDialog } from '@/components/dialogs/MachineSettingsDialog'

import 'bootstrap/dist/css/bootstrap.css'
import "@blueprintjs/core/lib/css/blueprint.css"
import "normalize.css"
import "./globals.css"
import { CmykSplitSettingsDialog } from '@/components/derivations/CmykSplit'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <OverlaysProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <ImportImageDialog />
            <MachineSettingsDialog />
            <CmykSplitSettingsDialog />
          </body>
        </html>
      </OverlaysProvider>
    </ReduxProvider>
  )
}
