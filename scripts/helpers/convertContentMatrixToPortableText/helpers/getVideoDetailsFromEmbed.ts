export type VideoDetails = {
  videoProvider: string
  videoId: string
  title?: string
  thumbnail?: {
    _type: string
    _sanityAsset: string
  }
}

/**
 * This function extracts the video type and ID from an embed code
 * @param {string} embed The embed code, either in youtube or wistia format
 * @returns {VideoDetails} The video type and ID
 */
export const getVideoDetailsFromEmbed = async (
  embed: string,
): Promise<VideoDetails | undefined> => {
  let videoProvider
  let videoId

  let videoDetails = {}

  if (embed.includes('wistia')) {
    videoProvider = 'wistia'

    const match = embed.match(/medias\/(.+?)\.jsonp/)
    videoId = match ? match[1] : ''
  } else if (embed.includes('youtube')) {
    videoProvider = 'youtube'

    const match = embed.match(/embed\/(.+?)"/)
    videoId = match ? match[1] : ''
  }

  if (!videoProvider || !videoId) {
    // throw new Error(`Invalid video embed code: ${embed}`)
    return undefined
  }

  if (videoProvider === 'youtube') {
    videoDetails = await getYoutubeVideoDetails(videoId)
  }

  if (videoProvider === 'wistia') {
    // sdk.auth(process.env.SANITY_STUDIO_WISTIA_API_TOKEN || '')

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.SANITY_STUDIO_WISTIA_API_TOKEN}`,
      },
    }

    const response = await fetch(
      `https://api.wistia.com/v1/medias/${videoId}.json`,
      options,
    ).then((res) => res.json())

    const thumbnail = response.thumbnail
      ? {
          _type: 'image',
          _sanityAsset: `image@${response.thumbnail.url.split('?')[0]}`,
        }
      : undefined

    videoDetails = {
      title: response.name,
      thumbnail,
    }
  }

  const cleanVideoId = videoId.split('?')[0]

  return { videoProvider, videoId: cleanVideoId, ...videoDetails }
}

export const getYoutubeVideoDetails = async (videoId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  ).then((res) => res.json())

  const data = response.items[0]?.snippet

  if (!data) return {}

  return {
    title: data.title,
    thumbnail: {
      _type: 'image',
      _sanityAsset: `image@${data.thumbnails.high.url}`,
    },
  }
}
