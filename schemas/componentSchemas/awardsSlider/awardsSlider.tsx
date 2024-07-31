import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '../../fields/defineHeadingField'
import {
  PreviewProps,
  SanityClient,
  TypedObject,
  defineField,
  set,
  useClient,
} from 'sanity'
import { IoRibbonOutline } from 'react-icons/io5'
import { awardField } from './awardField'
import { useEffect, useState } from 'react'
import { studioApiVersion } from '@/lib/api'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { blockPreview } from 'sanity-pills'

interface PreviewAwardsSliderProps extends PreviewProps {
  heading: TypedObject[]
  awards: {
    company: { _ref: string }
  }[]
}

const fetchCompanyNames = async (
  client: SanityClient,
  companyIds: string[],
) => {
  return await client.fetch(
    '*[_type == "company" && _id in $companyIds].name',
    { companyIds },
  )
}

const PreviewAwardsSlider = (props: PreviewAwardsSliderProps) => {
  const [companyNames, setCompanyNames] = useState<string[]>([])

  const { renderDefault, awards, heading } = props

  const client = useClient({ apiVersion: studioApiVersion })

  useEffect(() => {
    if (!awards) return

    const getCompanyNames = async (companyIds: string[]) => {
      const companyNames = await client.fetch(
        '*[_type == "company" && _id in $companyIds].name',
        { companyIds },
      )

      setCompanyNames(companyNames)
    }

    getCompanyNames(awards.map((award) => award.company?._ref))
  }, [awards, client])

  if (!awards || companyNames.length === 0) {
    return renderDefault({ ...props, subtitle: 'No awards selected' })
  }

  const headingString = blockPreview(heading)

  return (
    <Box>
      {renderDefault(props)}
      <Card margin={3} marginTop={2} padding={3} border>
        <Stack space={3}>
          {heading && (
            <Text size={1} weight="bold">
              {headingString}
            </Text>
          )}
          <Flex dir="row" gap={2}>
            {companyNames.map((companyName, index) => (
              <Card key={index} padding={1} border>
                <Text size={1} muted>
                  {companyName}
                </Text>
              </Card>
            ))}
          </Flex>
        </Stack>
      </Card>
    </Box>
  )
}

export const awardsSlider = definePageComponent({
  name: 'awardsSlider',
  title: 'Awards Slider',
  description: 'A component that displays a slider of awards.',
  icon: IoRibbonOutline,
  fields: [
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [awardField],
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      awards: 'awards',
    },
    prepare: ({ heading, awards }) => {
      return {
        title: 'Awards Slider',
        heading,
        awards,
      }
    },
  },
  components: {
    preview: PreviewAwardsSlider,
  },
})
