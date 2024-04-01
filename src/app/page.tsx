'use client'

import { FileSelector } from '@/components/FileSelector'
import { Layers } from '@/components/Layers'
import { OutputSettings } from '@/components/OutputSettings'
import { Preview } from '@/components/Preview'
import { NavbarMenu } from '@/components/menus/NavbarMenu'

import "@blueprintjs/core/lib/css/blueprint.css"
import "normalize.css"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <NavbarMenu />
        <div className="container-fluid mt-4">
          <div className="row">
            {/* Left Sidebar */}
            <div className="col-sm-3">
              <FileSelector />
              <Layers />
            </div>
            {/* Preview Area */}
            <div className="col-sm-6">
              <Preview />
            </div>
            {/* Right Sidebar */}
            <div className="col-sm-3">
              <OutputSettings />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
