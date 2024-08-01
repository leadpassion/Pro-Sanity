import { CraftEvent } from '../craftTypes'

type EventType = 'event' | 'webinar'

export const getEventType = (event: CraftEvent): EventType => {
  const { primaryCategory: cat } = event

  if (cat.includes(30336) || cat.includes(850097) || cat.includes(458)) {
    return 'webinar'
  }

  return 'event'
}
