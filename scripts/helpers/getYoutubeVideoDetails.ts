export const getYoutubeVideoDetails = async (videoId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  )

  const data = await response.json()

  return data.items[0].snippet
}
