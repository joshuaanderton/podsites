import React, { PropsWithChildren, useInsertionEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import usePodcast from '@/use-podcast'
import { AudioProvider } from '@/audio-player/audio-provider'
import { AudioPlayer } from '@/audio-player/audio-player'
import rssSvg from './svg/rss.svg?raw'
import applePodcastsSvg from './svg/apple-podcasts.svg?raw'
import spotifySvg from './svg/spotify.svg?raw'
import overcastSvg from './svg/overcast.svg?raw'
import pocketCastsSvg from './svg/pocket-casts.svg?raw'
import settings from '@/../settings.json'

const Layout: React.FC<PropsWithChildren<{ title?: string, header?: JSX.Element }>> = ({ title, header, children }) => {

  const podcast = usePodcast()

  useInsertionEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', settings.colors.primary)
    root.style.setProperty('--color-secondary', settings.colors.secondary)
  }, [])

  useInsertionEffect(() => {
    if (!title) return
    document.title = title
  }, [title])

  return (
    <AudioProvider>
      <div className="w-full">

        <Sidebar className="lg:w-[22rem]" />

        <div className={clsx('fixed inset-x-0 bottom-0 z-10 lg:left-[22rem]')}></div>

        <div className={clsx('border-t border-neutral-200 lg:relative lg:border-t-0 lg:ml-[22rem]')}>
          <div className="relative divide-y divide-neutral-200 lg:min-h-screen lg:flex lg:flex-col">

            <header>
              <div className="py-8 max-w-7xl">
                <div className="container lg:max-w-4xl mx-auto px-6 lg:px-8">
                  <div className="prose mx-auto">
                    {header}
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <footer className="border-t border-neutral-200 bg-neutral-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
              <div className="mx-auto px-6 md:max-w-2xl md:px-4">

                <section>
                  <h2 className="flex pb-2 items-center font-mono text-xs uppercase tracking-wider font-bold">
                    {'About'}
                  </h2>
                  <div className={clsx('prose prose-sm')}><p>{podcast?.description}</p></div>
                </section>

              </div>
            </footer>

            <div className="sticky bottom-0">
              <AudioPlayer />
            </div>

          </div>
        </div>

      </div>

    </AudioProvider>
  )
}

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {

  const podcast = usePodcast(),
        subscribeLinks = [
          ['RSS Feed', rssSvg, settings.links.rss],
          ['Apple Podcast', applePodcastsSvg, settings.links.applePodcasts],
          ['Spotify', spotifySvg, settings.links.spotify],
          ['Overcast', overcastSvg, settings.links.overcast],
          ['Pocket Casts', pocketCastsSvg, settings.links.pocketCasts]
        ]

  return (
    <aside className={clsx(className, 'bg-neutral-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:items-start lg:overflow-y-auto')}>
      <div className={clsx(
        'flex flex-col relative space-y-10 z-10 mx-auto pt-8 lg:min-h-full lg:flex-auto lg:border-r lg:border-neutral-200',
        '[&>section]:px-6 lg:[&>section]:px-8'
      )}>

        <section>
          <Link to="/" aria-label="Homepage" className="relative mx-auto ring-1 ring-inset ring-black/10 block w-48 rounded-lg overflow-hidden bg-neutral-100 shadow-xl shadow-neutral-100 sm:w-64 lg:w-auto h-auto aspect-square">
            <img src={podcast?.image} width="960" height="960" className="w-full" />
          </Link>
        </section>

        <section className="text-center lg:text-left">
          <p className="text-xl lg:text-2xl font-bold">{podcast?.title}</p>
          {/* <p className="mt-2 text-sm [&>span]:font-semibold">{'with'} <span>Eric Gordon</span> and <span>Wes Bronson</span></p> */}
        </section>

        <section className="hidden lg:block flex-1">
          <h2 className="flex pb-2 items-center font-mono text-xs uppercase tracking-wider font-bold">
            {'About'}
          </h2>
          <div className={clsx('prose prose-sm')}><p>{podcast?.description}</p></div>
        </section>

        <section className="lg:mt-auto lg:sticky py-4 lg:bottom-0 bg-neutral-50 border-t border-neutral-200">
          <div className="hidden lg:block pointer-events-none h-12 w-full absolute left-0 bottom-[calc(100%+1px)] bg-gradient-to-t from-neutral-50" />
          <h2 className="hidden lg:flex pb-2 items-center font-mono text-xs uppercase tracking-wider font-bold">
            {'Subscribe'}
          </h2>
          <ul role="list" className="flex justify-center gap-x-6 lg:gap-x-0 lg:justify-between">
            {subscribeLinks.map(([label, icon, url]) => (
              <li key={label} className="size-8 lg:size-10 flex">
                <a
                  href={url}
                  target="_blank"
                  className="group -m-[13%]"
                  title={`Subscribe via ${label}`}
                  aria-label={label}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: icon }}
                    className="text-primary group-hover:text-secondary [&>svg]:w-full [&>svg]:h-auto [&>svg]:fill-current [&>svg]:transition-colors" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </aside>
  )
}

export default Layout
