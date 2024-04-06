'use client'

import { Preview } from '@/components/Preview'
import { CmykSplitSettingsDialog } from '@/components/derivations/CmykSplit'
import { ImportImageDialog } from '@/components/dialogs/ImportImageDialog'
import { MachineSettingsDialog } from '@/components/dialogs/MachineSettingsDialog'
import { LayersTree } from '@/components/layers/Layers'
import { NavbarMenu } from '@/components/menus/NavbarMenu'
import { TaskQueuePanel } from '@/components/queue/TaskQueuePanel'
import { store } from '@/redux/store'
import { OverlaysProvider } from '@blueprintjs/core'
import { Inter } from 'next/font/google'
import { Fragment } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <OverlaysProvider>
        <html lang="en">
          <body className={inter.className}>
            <Body />
            <Dialogs />
          </body>
        </html>
      </OverlaysProvider>
    </ReduxProvider>
  )
}

function Body() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <NavbarMenu />
        <div className="container-fluid mt-4">
          <div className="row">
            {/* Left Sidebar */}
            <div className="col-sm-3">
              <LayersTree />
            </div>
            {/* Preview Area */}
            <div className="col-sm-6">
              <Preview />
            </div>
            <div className='col-sm-3'>
              <TaskQueuePanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Dialogs() {
  return (
    <Fragment>
      <ImportImageDialog />
      <MachineSettingsDialog />
      <CmykSplitSettingsDialog />
    </Fragment>
  );
}
