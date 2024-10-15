import Alpine from 'alpinejs'
import { parse } from 'rss-to-json'
import audioPlayer from './audio-player'
import './app.css'

window.Alpine = Alpine

Alpine.store('audioPlayer', audioPlayer())

Alpine.data('podcast', () => ({

  feedUrl: import.meta.env.VITE_FEED_URL,

  selectedEpisode: null,

  podcast: null,

  formatDate: (date) => (new Date(date)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),

  shorten: (content, length) => {
    const div = document.createElement('div')
    div.innerHTML = content
      .replaceAll('</p>', '</p>\n')
      .replaceAll(/<br\s*\/?>/g, '\n')
    content = String(div.textContent).split('\n')[0]
    return content.substring(0, length) + (content.length > length ? '...' : '')
  },

  init() {

    parse(this.feedUrl).then(podcast => {

      podcast.items = podcast.items.map(item => ({ ...item, url: item.enclosures.find(({ type }) => type === 'audio/mpeg')?.url }))

      let pageTitle = podcast.title

      const path = window.location.pathname
      if (path.startsWith('/episodes/')) {
        this.selectedEpisode = podcast.items.find(item => item.id === path.split('/')[2])
        pageTitle = this.selectedEpisode.title
      }

      this.podcast = podcast

      document.title = pageTitle

    })
  }

}))

Alpine.start()
