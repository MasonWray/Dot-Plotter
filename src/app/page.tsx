'use client'

import { Layers } from '@/components/Layers'
import { Preview } from '@/components/Preview'
import { NavbarMenu } from '@/components/menus/NavbarMenu'

export default function Home() {
  return (
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
  )
}
