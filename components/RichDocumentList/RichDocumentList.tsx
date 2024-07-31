// export const RichDocumentList = (props) => {
//   console.log('document list props', props)

import { studioApiVersion } from '@/lib'
import {
  Box,
  Flex,
  MenuDivider,
  Spinner,
  Stack,
  Text,
  useClickOutside,
} from '@sanity/ui'
import React from 'react'
import { useClient } from 'sanity'
import { DocumentCard } from './DocumentCard'

//   return <div>Rich document list</div>
// }

// Make a class component with forward ref that extends React.Component
// and has a render method that returns a div with the text 'Rich document list'

export class RichDocumentList extends React.Component<unknown> {
  // destructuring props from this.props, getting options
  // and assigning it to a variable called options
  // then console logging options
  constructor(props: unknown) {
    super(props)
    const { options } = this.props
  }

  render() {
    // logging options
    return <ListRenderer {...this.props} />
  }
}

const ListRenderer = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { options } = props
  const { filter } = options
  const [documents, setDocuments] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  React.useEffect(() => {
    // fetch documents
    client.fetch(`*[${filter}]`).then((docs) => {
      setDocuments(docs)
      setLoading(false)
    })
  }, [filter, client])

  if (loading) {
    return (
      <Box padding={4}>
        <Flex
          align="center"
          direction="row"
          gap={3}
          height="fill"
          justify="center"
        >
          <Spinner muted />
          <Text muted size={1}>
            Loading content…
          </Text>
        </Flex>
      </Box>
    )
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">
          Rich document list
        </Text>
        <Text size={2} muted>
          Found {documents.length} documents matching the query{' '}
          <code>{filter}</code>
        </Text>
        <MenuDivider />
        <Stack space={3}>
          {documents.map((doc) => (
            <DocumentCard key={doc._id} doc={doc} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
})
