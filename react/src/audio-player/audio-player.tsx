import { useEffect, useRef, useState } from 'react'
import { ForwardButton } from '@/audio-player/forward-button'
import { MuteButton } from '@/audio-player/mute-button'
import { PlaybackRateButton } from '@/audio-player/playback-rate-button'
import { PlayButton } from '@/audio-player/play-button'
import { RewindButton } from '@/audio-player/rewind-button'
import { ProgressBar } from '@/audio-player/progress-bar'
import { Link } from 'react-router-dom'
import { useAudioPlayer } from './hooks/use-audio-player'

function parseTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, seconds]
}

function formatHumanTime(seconds: number) {
  const [h, m, s] = parseTime(seconds)
  return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${
    m === 1 ? '' : 's'
  }, ${s} second${s === 1 ? '' : 's'}`
}

export function AudioPlayer() {
  const player = useAudioPlayer()

  const wasPlayingRef = useRef(false)

  const [currentTime, setCurrentTime] = useState<number | null>(
    player.currentTime,
  )

  useEffect(() => {
    setCurrentTime(null)
  }, [player.currentTime])

  if (!player.episode) {
    return null
  }

  return (
    <div className="flex items-center gap-6 bg-white/90 px-4 py-4 shadow shadow-neutral-200/80 ring-1 ring-neutral-200 bg-neutral-50 backdrop-blur-sm md:px-6">
      <PlayButton />
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-1 md:gap-2 overflow-hidden">
        <Link
          to={`/episodes/${player.episode.id}`}
          className="truncate text-sm font-bold leading-6"
          title={player.episode.title}
        >
          {player.episode.title}
        </Link>
        <div className="flex justify-between gap-6">
          <div className="flex items-center gap-2 text-neutral-400">
            <RewindButton player={player} />
            <PlaybackRateButton player={player} />
            <ForwardButton player={player} />
            <MuteButton player={player} />
          </div>
          <ProgressBar
            label="Current time"
            maxValue={player.duration}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([value]) => setCurrentTime(value)}
            onChangeEnd={([value]) => {
              player.seek(value)
              if (wasPlayingRef.current) {
                player.play()
              }
            }}
            numberFormatter={{ format: formatHumanTime } as Intl.NumberFormat}
            onChangeStart={() => {
              wasPlayingRef.current = player.playing
              player.pause()
            }}
          />
        </div>
      </div>
    </div>
  )
}
