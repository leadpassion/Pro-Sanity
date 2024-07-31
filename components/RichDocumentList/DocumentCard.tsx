import { Flex } from '@sanity/ui'
import { ReactNode, useMemo } from 'react'
import { PreviewCard, useSchema } from 'sanity'
import { usePaneRouter } from 'sanity/structure'

export const DocumentCard = ({ doc }: any) => {
  const schema = useSchema()
  const router = usePaneRouter()
  const { ChildLink, groupIndex, routerPanesState } = router

  const currentDoc = routerPanesState[groupIndex + 1]?.[0]?.id || false
  const pressed =
    currentDoc === doc._id || currentDoc === doc._id.replace(`drafts.`, ``)
  const selected = pressed && routerPanesState.length === groupIndex + 2

  const Link = useMemo(
    () =>
      function LinkComponent(linkProps: { children: ReactNode }) {
        return <ChildLink {...linkProps} childId={doc._id} />
      },
    [ChildLink, doc._id],
  )

  return (
    <PreviewCard
      __unstable_focusRing
      // @ts-expect-error
      as={Link}
      data-as="a"
      data-ui="PanelItem"
      radius={2}
      pressed={pressed}
      selected={selected}
      sizing="border"
      tabIndex={-1}
      tone="inherit"
      width="100%"
      flex={1}
    >
      <Flex align="center">TEST!!!</Flex>
    </PreviewCard>
  )
}
