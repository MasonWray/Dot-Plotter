'use client'

import { Layers } from '@/components/Layers'
import { Preview } from '@/components/Preview'
import { CmykSplitSettingsDialog } from '@/components/derivations/CmykSplit'
import { ImportImageDialog } from '@/components/dialogs/ImportImageDialog'
import { MachineSettingsDialog } from '@/components/dialogs/MachineSettingsDialog'
import { NavbarMenu } from '@/components/menus/NavbarMenu'
import { store } from '@/redux/store'
import { OverlaysProvider } from '@blueprintjs/core'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from 'react-redux'

import "@blueprintjs/core/lib/css/blueprint.css"
import 'bootstrap/dist/css/bootstrap.css'
import "normalize.css"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <OverlaysProvider>
        <html lang="en">
          <body className={inter.className}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div>
                <NavbarMenu />
                <div className="container-fluid mt-4">
                  <div className="row">
                    {/* Left Sidebar */}
                    <div className="col-sm-3">
                      <Layers />
                    </div>
                    {/* Preview Area */}
                    <div className="col-sm-9">
                      <Preview />
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <ImportImageDialog />
            <MachineSettingsDialog />
            <CmykSplitSettingsDialog />
          </body>
        </html>
      </OverlaysProvider>
    </ReduxProvider>

  )
}
