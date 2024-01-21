import { FileSelector } from '@/components/FileSelector'
import { Layers } from '@/components/Layers'
import { OutputSettings } from '@/components/OutputSettings'
import { Preview } from '@/components/Preview'
import { Center, Grid, GridItem } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  return (
    <main>
      <Center>
        <Grid templateColumns={'repeat(6, 1fr)'} gap={4} margin={4}>
          <GridItem>
            <FileSelector />
            <Layers />
          </GridItem>
          <GridItem colSpan={4}>
            <Preview />
          </GridItem>
          <GridItem>
            <OutputSettings />
          </GridItem>
        </Grid>
      </Center>
    </main>
  )
}
