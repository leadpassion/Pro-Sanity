import { CraftEvent } from '../craftTypes'

export const handleEventTimezone = (event: CraftEvent) => {
  if (!event.eventDate) return undefined

  if (!event.eventTimezone) return 'America/New_York'

  // If the timezone is in the map, return the mapped timezone
  if (timezoneMap[event.eventTimezone]) return timezoneMap[event.eventTimezone]

  // If the timezone is not in the map, return the timezone as is
  return event.eventTimezone
}

const timezoneMap: { [key: string]: string } = {
  ET: 'America/New_York',
  AEDT: 'Australia/Sydney',
  'PST / 11:30 AM EST / 3:30 PM GMT': 'America/Los_Angeles',
  JKT: 'Asia/Jakarta',
  GMT: 'Europe/London',
  SGT: 'Asia/Singapore',
  BST: 'Europe/London',
  CT: 'America/Chicago',
  'BKK TIME': 'Asia/Bangkok',
  EDT: 'America/New_York',
  PT: 'America/Los_Angeles',
  CET: 'Europe/Paris',
  CEST: 'Europe/Paris',
  'Singapore Standard Time': 'Asia/Singapore',
}
