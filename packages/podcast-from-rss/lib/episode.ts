export default class Episode {

  id: string

  title: string

  summary: string

  content: string

  link: string

  audio: string

  author: string|null

  published: string

  created: string

  duration: number

  episodeType: "full" | "trailer" | "bonus"

  categories: string[]

  constructor(data: {
    id: string
    title: string
    description: string
    link: string
    author: string
    published: string
    created: string
    content: string
    content_encoded: string
    duration: string
    episodeType: "full" | "trailer" | "bonus"
    category: string[]
    enclosures: {length: string, type: string, url: string}[]
  }) {
    this.id = data.id
    this.title = data.title
    this.summary = firstLine(data.description)
    this.content = data.content
    this.link = data.link
    this.audio = data.enclosures.find(enclosure => enclosure.type === 'audio/mpeg')!.url
    this.author = data.author
    this.published = formatDate(data.published)
    this.created = formatDate(data.created)
    this.duration = parseInt(data.duration)
    this.episodeType = data.episodeType
    this.categories = data.category || []
  }

  get audioPlayer(): HTMLAudioElement {
    let player = document.querySelector<HTMLAudioElement>('#podcast-from-rss-player')
    if (!player) {
      player = document.createElement('audio')
      player.id = 'podcast-from-rss-player'
      player.controls = false
      document.body.appendChild(player)
    }
    return player
  }

  play() {
    if (this.audioPlayer.src != this.audio) {
      this.audioPlayer.src = this.audio
    }
    this.audioPlayer.play().then(() => this.playing = true)
  }

  pause() {
    if (this.audioPlayer.src != this.audio) {
      this.audioPlayer.src = this.audio
    }
    if (!this.playing) {
      return
    }
    this.audioPlayer.pause()
    this.playing = false
  }

  playing: boolean = false
}

const firstLine = (content: string, truncate?: number) => {
  const div = document.createElement('div')
  div.innerHTML = content
    .replaceAll('</p>', '</p>\n')
    .replaceAll(/<br\s*\/?>/g, '\n')
  content = String(div.textContent).split('\n')[0]
  return content.substring(0, truncate) + (truncate && content.length > truncate ? '...' : '')
}

const formatDate = (date: string) =>
  (new Date(date)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
