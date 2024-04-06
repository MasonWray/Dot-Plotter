import "@blueprintjs/core/lib/css/blueprint.css"
import 'bootstrap/dist/css/bootstrap.css'
import "normalize.css"
import "./globals.css"

export const metadata = {
  title: 'SwiftPlot',
  description: 'Browser-Based GCODE Toolkit',
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    [children]
  );
}
