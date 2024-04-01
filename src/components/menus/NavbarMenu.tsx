
import { FileMenu } from '@/components/menus/FileMenu'
import { Button, Dialog, Navbar, Popover } from '@blueprintjs/core'

export function NavbarMenu() {

  return (
    <Navbar>
      <Navbar.Group align={'left'}>
        <Navbar.Heading>{'SwiftPlot'}</Navbar.Heading>
        <Navbar.Divider />
        <Popover content={<FileMenu />}>
          <Button className={'bp5-minimal'} text={'File'} />
        </Popover>
      </Navbar.Group>
      <Navbar.Group align={'right'}>
        <Button icon={'git-branch'} text={'View on GitHub'} />
      </Navbar.Group>
    </Navbar>
  )
}