import { hues } from '@sanity/color'
import { Code, Flex, TextInput, useTheme_v2 } from '@sanity/ui'
import { type FormEvent, useCallback, useState } from 'react'
import { type Slug, type TextInputProps, set, unset } from 'sanity'
import { useDocumentPane } from 'sanity/structure'

interface PrefixedSlugInputOptions {
  slugPrefix?: string
  includeSlugPrefixInStoredValue?: boolean
}

export const PrefixedSlugInput = (props: TextInputProps) => {
  const { value, onChange } = props
  const { schemaType } = useDocumentPane()
  const { slugPrefix, includeSlugPrefixInStoredValue = false } =
    schemaType.fields.find((field) => field.name === 'seo')?.type
      .options as PrefixedSlugInputOptions
  const storedSlugCurrent = (value as Slug | undefined)?.current
  const editablePortion = storedSlugCurrent?.replace(`${slugPrefix}/`, '')
  const [editedSlug, setEditedSlug] = useState(editablePortion)
  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const backgroundColor = isDarkMode ? hues.gray[950].hex : hues.gray[50].hex
  const borderColor = isDarkMode ? hues.gray[800].hex : hues.gray[200].hex

  const handleChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) => {
      const editedValue = evt.currentTarget.value

      if (editedValue.trim() === '') {
        onChange(unset())
        return
      }

      const fullSlugCurrent = includeSlugPrefixInStoredValue
        ? `${slugPrefix}/${editedValue}`
        : editedValue

      const fullSlug = {
        _type: 'slug',
        current: fullSlugCurrent,
      }

      onChange(set(fullSlug))
      setEditedSlug(editedValue)
    },
    [includeSlugPrefixInStoredValue, slugPrefix, onChange],
  )

  // If the value is changed by another user, update the editedSlug state
  if (editablePortion !== editedSlug) {
    setEditedSlug(editablePortion)
  }

  const displayedPrefix = slugPrefix ? `/${slugPrefix}/` : '/'

  return (
    <Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        paddingX={2}
        style={{
          height: '33px',
          backgroundColor,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderTopLeftRadius: '3px',
          borderBottomLeftRadius: '3px',
        }}
      >
        <Code size={1} muted>
          {displayedPrefix}
        </Code>
      </Flex>
      <div style={{ flex: 1 }}>
        <TextInput
          rows={1}
          id="slug-input"
          placeholder="slug"
          onChange={handleChange}
          style={{
            transform: 'translateX(-2px)',
            flex: 1,
          }}
          value={editedSlug}
        />
      </div>
    </Flex>
  )
}
