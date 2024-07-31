import { PreviewProps } from 'sanity'

interface PreviewBlogPostProps extends PreviewProps {
  title: string
  excerpt: string
}

export const PreviewBlogPost = (props: PreviewBlogPostProps) => {
  const { renderDefault, title, excerpt } = props

  return (
    <div>
      <h1>{title}</h1>
      <p>{excerpt}</p>
    </div>
  )
}
