import React from 'react'
import Layout from '@/layout'
import usePodcast, { Episode } from '@/use-podcast'
import { Link } from 'react-router-dom'
import { PlayButton, PauseIcon, PlayIcon } from '@/audio-player/play-button'

export const Homepage: React.FC = () => {

  const podcast = usePodcast(),
        hasAudio = (episode: Episode) => !!episode.enclosures.find(({ type }) => type === 'audio/mpeg')

  return (
    <Layout title={podcast.title} header={<h1>{'Latest Episodes'}</h1>}>
      {podcast.items.slice(0, 5).map(episode => {

        const pubDate = (new Date(episode.published)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              short = shorten(episode.description, 250)

        return (
          <article key={episode.id} aria-labelledby={episode.title}>
            <div className="py-8 max-w-7xl">
              <div className="container lg:max-w-4xl mx-auto px-6 lg:px-8">
                <div className="prose mx-auto">

                  <time dateTime={pubDate} className="uppercase tracking-widest font-mono font-bold text-xs leading-none">{pubDate}</time>

                  <h2 id={episode.title} className="mt-1 mb-0">
                    <Link to={`/episodes/${episode.id}`} className="font-bold no-underline">{episode.title}</Link>
                  </h2>

                  <p className="mt-2">{short}</p>

                  <div className="mt-4 flex items-center gap-4">
                    {hasAudio(episode) && <>
                      <PlayButton
                        aria-label={`Play ${episode.title}`}
                        episode={episode}
                        playing={
                          <span className="flex items-center gap-x-2">
                            <PauseIcon className="size-3.5 fill-current" />
                            {'Pause'}
                          </span>
                        }
                        paused={
                          <span className="flex items-center gap-x-2">
                            <PlayIcon className="size-3.5 fill-current" />
                            {'Listen'}
                          </span>
                        }
                      />
                      <span aria-hidden="true" className="text-sm font-bold opacity-30">{'/'}</span>
                    </>}
                    <Link to={`/episodes/${episode.id}`} aria-label={`Show notes for ${episode.title}`}>
                      {'Show Notes'}
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </article>
        )
      })}
    </Layout>
  )
}

const shorten = (content: string, length: number) => {
  const div = document.createElement('div')
  div.innerHTML = content
    .replaceAll('</p>', '</p>\n')
    .replaceAll(/<br\s*\/?>/g, '\n')
  content = String(div.textContent).split('\n')[0]
  return content.substring(0, length) + (content.length > length ? '...' : '')
}
