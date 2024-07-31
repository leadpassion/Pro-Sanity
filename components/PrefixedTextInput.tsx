import { Code, Flex, TextInput } from '@sanity/ui'
import { TextInputProps, set, unset } from 'sanity'
import { hues } from '@sanity/color'
import { FormEvent, useCallback, useState } from 'react'

interface PrefixedTextInputOptions {
  prefix: string
  includeSlugPrefixInStoredValue?: boolean
}

export const PrefixedTextInput = (props: TextInputProps) => {
  const { renderDefault, schemaType, value, onChange } = props
  const options = (schemaType.options || {}) as PrefixedTextInputOptions

  const storedSlugCurrent = (value as any)?.current
  const editablePortion = storedSlugCurrent?.replace(`${options.prefix}/`, '')

  const [editedSlug, setEditedSlug] = useState(editablePortion)
  const { prefix, includeSlugPrefixInStoredValue = false } = options

  const handleChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) => {
      const editedValue = evt.currentTarget.value

      if (editedValue.trim() === '') {
        onChange(unset())
        return
      }

      const fullSlugCurrent = includeSlugPrefixInStoredValue
        ? `${prefix}/${editedValue}`
        : editedValue

      const fullSlug = {
        _type: 'slug',
        current: fullSlugCurrent,
      }

      onChange(set(fullSlug))
      setEditedSlug(editedValue)
    },
    [onChange, includeSlugPrefixInStoredValue, prefix],
  )

  // If the value is changed by another user, update the editedSlug state
  if (editablePortion !== editedSlug) {
    setEditedSlug(editablePortion)
  }

  if (!options || !prefix) {
    return renderDefault(props)
  }

  const displayedPrefix = `${prefix}/`

  return (
    <Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        paddingX={2}
        style={{
          height: '33px',
          backgroundColor: hues.gray[50].hex,
          border: `1px solid ${hues.gray[200].hex}`,
          borderRight: 'none',
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
