import { useAudioPlayer } from '@/audio-player/hooks/use-audio-player'
import { type Episode } from '@/use-podcast'
import clsx from 'clsx'

type Props = React.ComponentPropsWithoutRef<'button'> & {
  episode?: Episode
  playing?: React.ReactNode
  paused?: React.ReactNode
}

export function PlayButton({ episode, playing, paused, ...props }: Props) {
  const player = useAudioPlayer(episode)

  props.className = clsx(props.className, (playing || paused) ? null : [
    'group relative flex size-10 md:size-14 m-[0.25rem] flex-shrink-0 items-center justify-center rounded-full',
    'bg-neutral-700 hover:bg-secondary focus:outline-none focus:ring focus:ring-offset-4',
    '[&_svg]:size-[50%] [&_svg]:fill-white [&:active_svg]:fill-white/80',
  ])

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${player.episode?.title}`}
      {...props}
    >
      {player.playing ? (
        playing || <PauseIcon />
      ) : (
        paused || <PlayIcon />
      )}
    </button>
  )
}

export function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" {...props}>
      <path d="M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z" />
    </svg>
  )
}

export function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" {...props}>
      <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
    </svg>
  )
}

