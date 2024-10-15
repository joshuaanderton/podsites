import React from 'react'
import Layout from '@/layout'
import usePodcast from '@/use-podcast'
import { PlayButton } from '@/audio-player/play-button'

export const Episode: React.FC = () => {

  const episode = usePodcast().items[0],
        pubDate = (new Date(episode.published)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <Layout title={episode.title} header={
      <div className="flex items-center gap-6">
        <PlayButton episode={episode} className="size-14 md:size-18" />
        <div>
          <time dateTime={pubDate} className="uppercase tracking-widest font-mono text-xs leading-7">{pubDate}</time>
          <h1 className="mb-0">{episode.title}</h1>
        </div>
      </div>
    }>
      <section>
        <div className="py-8 max-w-7xl">
          <div className="container lg:max-w-4xl mx-auto px-6 lg:px-8">
            <div
              className="prose mx-auto"
              dangerouslySetInnerHTML={{ __html: episode.content || '' }}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
