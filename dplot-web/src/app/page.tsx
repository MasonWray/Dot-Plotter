import { FileSelector } from '@/components/FileSelector'
import { Layers } from '@/components/Layers'
import { OutputSettings } from '@/components/OutputSettings'
import { Preview } from '@/components/Preview'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img src="https://masonwray.github.io/Dot-Plotter/favicon.ico" alt="Logo" height="32" />
              {"Dot Plotter"}
            </div>
            <div className="d-flex">
              <div className="nav-item">
                <div className="nav-link btn-group">
                  <button className="btn btn-outline-secondary btn-sm" disabled={true}>{'ADD VERSION HERE'}</button>
                  <a href="https://github.com/MasonWray/Dot-Plotter" className="btn btn-outline-secondary btn-sm"> View on GitHub</a>
                </div>
              </div>
            </div>
          </div >
        </nav >
        <div className="container-fluid">
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
