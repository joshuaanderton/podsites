import React, { PropsWithChildren, useInsertionEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import usePodcast from '@/use-podcast'
import { AudioProvider } from '@/audio-player/audio-provider'
import { AudioPlayer } from '@/audio-player/audio-player'

const Layout: React.FC<PropsWithChildren<{ title?: string, header?: JSX.Element }>> = ({ title, header, children }) => {

  const podcast = usePodcast()

  useInsertionEffect(() => {
    if (!title) return
    document.title = title
  }, [title])

  return (
    <AudioProvider>
      <div className="w-full">

        <Sidebar className="lg:w-[22rem]" />

        <div className={clsx('fixed inset-x-0 bottom-0 z-10 lg:left-[22rem]')}></div>

        <main className={clsx('border-t border-neutral-200 lg:relative lg:border-t-0 lg:ml-[22rem]')}>
          <div className="relative divide-y divide-neutral-200">

            <header>
              <div className="py-8 max-w-7xl">
                <div className="container lg:max-w-4xl mx-auto px-6 lg:px-8">
                  <div className="prose mx-auto">
                    {header}
                  </div>
                </div>
              </div>
            </header>

            {children}

            <div className="sticky bottom-0">
              <AudioPlayer />
            </div>

          </div>
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

      </div>

    </AudioProvider>
  )
}

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {

  const podcast = usePodcast()

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
            {(
              [
                ['RSS Feed', RSSIcon, import.meta.env.VITE_FEED_URL || ''],
                ['Apple Podcast', ApplePodcastIcon, '/'],
                ['Spotify', SpotifyIcon, '/'],
                ['Overcast', OvercastIcon, '/'],
                ['Pocket Casts', PocketCastsIcon, '/']
              ] as const
            ).map(([label, Icon, url]) => (
              <li key={label} className="size-8 lg:size-10 flex">
                <a
                  href={url}
                  target="_blank"
                  className="group -m-[13%]"
                  title={`Subscribe via ${label}`}
                  aria-label={label}
                >
                  <Icon className="w-full h-auto fill-primary group-hover:fill-secondary transition-colors" />
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

function PocketCastsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#F43E37" viewBox="-3 -3 30 30" {...props}>
      <path d="M12,0C5.372,0,0,5.372,0,12c0,6.628,5.372,12,12,12c6.628,0,12-5.372,12-12 C24,5.372,18.628,0,12,0z M15.564,12c0-1.968-1.596-3.564-3.564-3.564c-1.968,0-3.564,1.595-3.564,3.564 c0,1.968,1.595,3.564,3.564,3.564V17.6c-3.093,0-5.6-2.507-5.6-5.6c0-3.093,2.507-5.6,5.6-5.6c3.093,0,5.6,2.507,5.6,5.6H15.564z M19,12c0-3.866-3.134-7-7-7c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7v2.333c-5.155,0-9.333-4.179-9.333-9.333 c0-5.155,4.179-9.333,9.333-9.333c5.155,0,9.333,4.179,9.333,9.333H19z"></path>
    </svg>
  )
}

function SpotifyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

function OvercastIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M16 28.8A12.77 12.77 0 0 1 3.2 16 12.77 12.77 0 0 1 16 3.2 12.77 12.77 0 0 1 28.8 16 12.77 12.77 0 0 1 16 28.8Zm0-5.067.96-.96-.96-3.68-.96 3.68.96.96Zm-1.226-.054-.48 1.814 1.12-1.12-.64-.694Zm2.453 0-.64.64 1.12 1.12-.48-1.76Zm.907 3.307L16 24.853l-2.133 2.133c.693.107 1.387.213 2.133.213.747 0 1.44-.053 2.134-.213ZM16 4.799C9.814 4.8 4.8 9.813 4.8 16c0 4.907 3.147 9.067 7.52 10.56l2.4-8.906c-.533-.374-.853-1.014-.853-1.707A2.14 2.14 0 0 1 16 13.813a2.14 2.14 0 0 1 2.134 2.133c0 .693-.32 1.28-.854 1.707l2.4 8.906A11.145 11.145 0 0 0 27.2 16c0-6.186-5.013-11.2-11.2-11.2Zm7.307 16.747c-.267.32-.747.427-1.12.16-.373-.267-.427-.747-.16-1.067 0 0 1.44-1.92 1.44-4.64 0-2.72-1.44-4.64-1.44-4.64-.267-.32-.213-.8.16-1.066.373-.267.853-.16 1.12.16.107.106 1.76 2.293 1.76 5.546 0 3.254-1.653 5.44-1.76 5.547Zm-3.893-2.08c-.32-.32-.267-.907.053-1.227 0 0 .8-.853.8-2.24 0-1.386-.8-2.186-.8-2.24-.32-.32-.32-.853-.053-1.226.32-.374.8-.374 1.12-.054.053.054 1.333 1.387 1.333 3.52 0 2.134-1.28 3.467-1.333 3.52-.32.32-.8.267-1.12-.053Zm-6.827 0c-.32.32-.8.373-1.12.053-.053-.106-1.333-1.386-1.333-3.52 0-2.133 1.28-3.413 1.333-3.52.32-.32.853-.32 1.12.054.32.32.267.906-.053 1.226 0 .054-.8.854-.8 2.24 0 1.387.8 2.24.8 2.24.32.32.373.854.053 1.227Zm-2.773 2.24c-.374.267-.854.16-1.12-.16-.107-.107-1.76-2.293-1.76-5.547 0-3.253 1.653-5.44 1.76-5.546.266-.32.746-.427 1.12-.16.373.266.426.746.16 1.066 0 0-1.44 1.92-1.44 4.64 0 2.72 1.44 4.64 1.44 4.64.266.32.16.8-.16 1.067Z" />
    </svg>
  )
}

function RSSIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

export default Layout
