
import { FileMenu } from '@/components/menus/FileMenu'
import { Button, Navbar, Popover } from '@blueprintjs/core'
import { SetupMenu } from './SetupMenu'

export function NavbarMenu() {

  return (
    <Navbar>
      <Navbar.Group align={'left'}>
        <Navbar.Heading>{'SwiftPlot'}</Navbar.Heading>
        <Navbar.Divider />
        <Popover content={<FileMenu />}>
          <Button className={'bp5-minimal'} text={'File'} />
        </Popover>
        <Popover content={<SetupMenu />}>
          <Button className={'bp5-minimal'} text={'Setup'} />
        </Popover>
      </Navbar.Group>
      <Navbar.Group align={'right'}>
        <Button icon={'git-branch'} text={'View on GitHub'} onClick={() => window.open('https://github.com/MasonWray/Dot-Plotter', '_blank')} />
      </Navbar.Group>
    </Navbar>
  )
}