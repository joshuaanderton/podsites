import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { parse } from 'rss-to-json'

export interface Episode {
  id: string
  title: string
  description: string
  description_short: string
  link: string
  author: string
  published: string
  created: number
  content: string
  content_encoded: string
  itunes_duration: string
  itunes_episodeType: string
  media: string
  audio: string|null
  category: string[]
  enclosures: {length: string, type: string, url: string}[]
}

export interface Podcast {
  title: string
  description: string
  image: string
  link: string
  category: string[]
  items: Episode[]
}

export const podcastLoader = async ({ params }: LoaderFunctionArgs): Promise<Podcast|null> => {

  const feedUrl = import.meta.env.VITE_FEED_URL as string

  if (!feedUrl) {
    throw new Error('Feed URL not set')
  }

  const podcast: Podcast|null = await parse(feedUrl)

  if (!podcast) {
    throw new Error('Podcast feed could not be loaded')
  }

  if (podcast && params.episodeId) {
    podcast.items = podcast.items.filter(({ id }) => id === params.episodeId)

    if (podcast.items.length === 0) {
      throw new Error('Episode not found')
    }
  }

  return podcast
}

export const usePodcast = () => useLoaderData() as Podcast

export default usePodcast
