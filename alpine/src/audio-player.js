export default (initialDuration = null) => ({
  loading: false,
  playing: false,
  episode: null,
  active: false,
  timestamp: false,
  formattedTimestamp: '00:00',
  seekHoverPercent: 0,
  seekingByTouch: false,
  canPlayThrough: false,
  duration: initialDuration,
  currentTime: 0,
  volume: 1,
  speed: 1.0,
  displaySpeed: 1,
  muted: false,
  title: null,
  init() {
    if (this.timestamp) {
      this.seekToSeconds(this.timestamp)
    }
    this.updateDuration()
  },
  handleLoadedMetadata() {
    this.updateCurrentTime()
    this.updateVolume()
    this.updateDuration()
  },
  get audioElement() {
    return this.$refs?.audio || document.querySelector('audio#audio-player')
  },
  updateCurrentTime(reset = false) {
    this.currentTime = this.audioElement.currentTime

    // if the embed player sharing panel is closed,
    // set the formattedTimestamp to the formatted time
    if (reset || this.expandedPanel != 'sharing') {
      this.formattedTimestamp = this.formatTime(this.audioElement.currentTime)
    }
  },
  updateVolume() {
    this.volume = this.audioElement.volume
  },
  updateAudioPlayerVolume() {
    this.audioElement.volume = this.volume
  },
  formatTime(seconds = 0) {
    let [start, end] = seconds >= 3600 ? [11, 8] : [14, 5]
    return new Date(1000 * seconds).toISOString().substr(start, end)
  },
  updateDuration() {
    let duration = this.audioElement.duration || this.duration
    this.duration = isNaN(duration) ? 0 : duration
  },
  progressPercentage() {
    return 100 / this.duration * this.currentTime
  },
  volumePercentage() {
    return Math.round(100 / 1 * this.volume)
  },
  mute() {
    this.muted = true
    this.audioElement.muted = true
    this.volume = 0
  },
  unmute() {
    this.muted = false
    this.audioElement.muted = false
    this.updateVolume()
  },
  toggleMute() {
    if (this.muted) {
      this.unmute()
      return
    }
    this.mute()
  },
  toggleSpeed() {
    let tempSpeed = this.speed === 2.0 ? 1.0 : this.speed + 0.25
    this.displaySpeed = Math.floor(tempSpeed * 10) / 10
    this.speed = tempSpeed
    this.audioElement.playbackRate = this.speed
  },
  checkDefaultAudio() {
    let defaultAudio = document.getElementById('default-audio')
    if (defaultAudio && (typeof(defaultAudio.dataset.defaultAudioUrl) !== 'undefined') && defaultAudio.dataset.defaultAudioUrl != '') {
      // use the defaultAudio on the page if the audio src hasn't been set or if it changes
      if (this.audioElement.src === '' || this.audioElement.src != defaultAudio.dataset.defaultAudioUrl) {
        this.title = defaultAudio.dataset.defaultAudioTitle
        this.duration = defaultAudio.dataset.defaultAudioDuration
        this.audioElement.src = defaultAudio.dataset.defaultAudioUrl
      }
    }
  },
  playEpisode(episode) {
    this.title = episode.title
    this.duration = episode.duration
    if(this.audioElement.src != episode.url) {
      this.audioElement.src = episode.url
      this.episode = episode
    }
    // play without checking for defaultAudio
    this.play(false)
  },
  play(defaultAudioCheck = true, playing = false) {
    // only check defaultAudio if requested and if the player isn't already active
    if (defaultAudioCheck && !this.active) {
      this.checkDefaultAudio()
    }

    if (!playing) this.audioElement.play()

    this.playing = true
    this.active = true
    this.animate()
  },
  pause(playing = true) {
    if (playing) this.audioElement.pause()
    this.playing = false
  },
  waiting() {
    if (!this.canPlayThrough) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  seekBySeconds(seconds) {
    if (this.currentTime + seconds >= this.duration) {
      this.pause()
      this.audioElement.currentTime = this.duration
    } else {
      this.audioElement.currentTime = this.currentTime + seconds
    }
    this.updateCurrentTime()
  },
  seekToSeconds(seconds, forcePlay = false) {
    this.timestamp = seconds
    this.checkDefaultAudio()
    this.updateDuration()
    // stop audio playing if seeking to the end of the audio
    if (seconds >= this.duration) {
      this.pause()
      this.audioElement.currentTime = this.duration
      this.updateCurrentTime()
      this.timestamp = false
    } else {
      this.audioElement.currentTime = seconds
      this.updateCurrentTime()
      this.timestamp = false
      // continue playing if the player is already playing as audio src may have changed
      if (this.playing || forcePlay) {
        this.play(false)
      }
    }
  },
  seekTo(event) {
    const [element, percent, position] = this.computeProgress(event, event.clientX)

    this.seek(percent)
  },
  seek(percent) {
    this.audioElement.currentTime = this.duration * percent
    this.updateCurrentTime()
    this.play(false)
  },
  seekToVolume(event) {
    let [element, percent, volume] = this.computeProgress(event, event.clientX)

    volume = Math.ceil(volume) / 100

    if (volume > .95) {
      volume = 1
    }

    this.audioElement.volume = volume

    if (volume > 0 && this.audioElement.muted) {
      this.unmute()
    }
  },
  hoverSeekTo(event) {
    const [element, percent, position] = this.computeProgress(event, event.clientX)

    this.seekHoverPercent = percent
    element.style.setProperty('--player-progress-hover', `${position}%`)
  },
  touchDragSeekTo(event) {
    const [element, percent, position] = this.computeProgress(event, event.touches[0].clientX)

    if (percent >= 0.0 && percent <= 1.0) {
      this.seekingByTouch = true
      this.seekHoverPercent = percent
      element.style.setProperty('--player-progress-hover', `${position}%`)
    } else {
      this.seekingByTouch = false
      this.seekHoverPercent = 0
      element.style.setProperty('--player-progress-hover', '0%')
    }
  },
  touchDragEnd(event) {
    // click events also fire a touchend event, so skip unless seeking by touch
    if (!this.seekingByTouch) return

    this.seekingByTouch = false
    const [element, percent, position] = this.computeProgress(event, event.changedTouches[0].clientX)

    this.seek(percent)
  },
  computeProgress(event, clientX) {
    const element = event.currentTarget || event.target,
          rect = element.getBoundingClientRect(),
          percent = (clientX - rect.x) / rect.width
          position = 100 * percent

    return [element, percent, position]
  },
  animate() {
    if (!this.playing) return

    requestAnimationFrame(()=> { this.animate() })
    this.updateCurrentTime()
  },
  reload() {
    this.audioElement.load()
  },
  reset() {
    this.audioElement.currentTime = 0
    this.updateCurrentTime(true)
    this.playing = false
    setTimeout(() => {
      if (!this.playing) {
        this.active = false
      }
    }, 2000)
  }
})
