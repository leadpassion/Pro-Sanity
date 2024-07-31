import { FieldDefinition, defineField } from 'sanity'

export const defineTimezoneField = (
  fieldOptions: Partial<FieldDefinition> = {},
) => {
  const {
    name = 'timezone',
    title = 'Timezone',
    icon,
    hidden,
    group,
    fieldset,
  } = fieldOptions
  return defineField({
    name,
    title,
    type: 'string',
    icon,
    hidden,
    group,
    fieldset,
    options: {
      list: [
        { title: 'Eastern Time', value: 'America/New_York' },
        { title: 'Central Time', value: 'America/Chicago' },
        { title: 'Mountain Time', value: 'America/Denver' },
        { title: 'Pacific Time', value: 'America/Los_Angeles' },
        { title: 'Greenwich Mean Time', value: 'Europe/London' },
        { title: 'Japan Standard Time', value: 'Asia/Tokyo' },
        { title: 'Singapore Standard Time', value: 'Asia/Singapore' },
        { title: 'Central European Time', value: 'Europe/Paris' },
        { title: 'Indochina Time', value: 'Asia/Bangkok' },
        { title: 'Eastern European Time', value: 'Europe/Kiev' },
        { title: 'Indian Standard Time', value: 'Asia/Kolkata' },
        { title: 'China Standard Time', value: 'Asia/Shanghai' },
        { title: 'Korea Standard Time', value: 'Asia/Seoul' },
        { title: 'Alaska Time', value: 'America/Anchorage' },
        { title: 'Hawaii Time', value: 'Pacific/Honolulu' },
        {
          title: 'Australian Eastern Standard Time',
          value: 'Australia/Sydney',
        },
        {
          title: 'Australian Central Standard Time',
          value: 'Australia/Adelaide',
        },
        {
          title: 'Australian Western Standard Time',
          value: 'Australia/Perth',
        },
        { title: 'UTC', value: 'UTC' },
      ],
    },
    initialValue: 'America/New_York',
  })
}
