import { createContext, useContext, useMemo } from 'react'
import { type Episode } from '@/use-podcast'

export const AudioPlayerContext = createContext<PlayerAPI | null>(null)

export function useAudioPlayer(episode?: Episode) {

  const player = useContext(AudioPlayerContext) as PlayerAPI

  return useMemo<PlayerAPI>(
    () => ({
      ...player,
      play: () => player.play(episode),
      toggle: () => player.toggle(episode),
      get playing() {
        return player.isPlaying(episode)
      },
    }),
    [player, episode],
  )
}

export interface PlayerState {
  playing: boolean
  muted: boolean
  duration: number
  currentTime: number
  episode: Episode | null
}

export interface PublicPlayerActions {
  play: (episode?: Episode) => void
  pause: () => void
  toggle: (episode?: Episode) => void
  seekBy: (amount: number) => void
  seek: (time: number) => void
  playbackRate: (rate: number) => void
  toggleMute: () => void
  isPlaying: (episode?: Episode) => boolean
}

export type PlayerAPI = PlayerState & PublicPlayerActions
