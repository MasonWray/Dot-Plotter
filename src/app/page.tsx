'use client'

import { FileSelector } from '@/components/FileSelector'
import { Layers } from '@/components/Layers'
import { OutputSettings } from '@/components/OutputSettings'
import { Preview } from '@/components/Preview'
import { Button, Navbar } from '@blueprintjs/core'

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Navbar>
          <Navbar.Group align={'left'}>
            <Navbar.Heading>{'SwiftPlot'}</Navbar.Heading>
            <Navbar.Divider />
            {/* <Button className={'bp5-minimal'} text={'File'} /> */}
          </Navbar.Group>
          <Navbar.Group align={'right'}>
            <Button icon={'git-branch'} text={'View on GitHub'}/>
          </Navbar.Group>
        </Navbar>
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
