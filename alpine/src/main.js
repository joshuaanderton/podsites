import Alpine from 'alpinejs'
import { parse } from 'rss-to-json'
import audioPlayer from './audio-player'
import './app.css'

window.Alpine = Alpine

Alpine.store('audioPlayer', audioPlayer())

Alpine.data('podcast', () => ({

  feedUrl: import.meta.env.VITE_FEED_URL,

  podcast: null,

  selectedEpisode: null,

  template: null, // "homepage" | "episode" | "not-found"

  error: null,
  errors: {
    404: {code: 404, title: 'Page not found', message: 'Sorry, we couldn’t find the page you’re looking for.'},
    500: {code: 500, title: 'Internal server error', message: 'Oops! Something went wrong. Check back soon!'},
  },

  formatDate: (date) => (new Date(date)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),

  shorten: (content, length) => {
    const div = document.createElement('div')
    div.innerHTML = content
      .replaceAll('</p>', '</p>\n')
      .replaceAll(/<br\s*\/?>/g, '\n')
    content = String(div.textContent).split('\n')[0]
    return content.substring(0, length) + (content.length > length ? '...' : '')
  },

  async loadFeed() {

    const path = window.location.pathname,
          podcast = await parse(this.feedUrl)

    if (!podcast) {
      throw new Error('Podcast feed not found')
    }

    // Set the audio URL for each episode
    podcast.items = podcast.items.map(item => ({ ...item, url: item.enclosures.find(({ type }) => type === 'audio/mpeg')?.url }))

    this.podcast = podcast

    if (path === '/') {

      this.template = 'homepage'
      document.title = this.podcast.title

    } else if (path.startsWith('/episodes/')) {

      if (!(this.selectedEpisode = podcast.items.find(item => item.id === path.split('/')[2]))) {
        throw new Error('Episode not found')
      }

      this.template = 'episode'
      document.title = this.selectedEpisode.title

    } else {

        this.error = this.errors[404]
        this.template = 'not-found'
        document.title = this.error.title

    }

  },

  init() {
    try {
      this.loadFeed()
    } catch (err) {
      this.error = this.errors[500]
      this.template = 'not-found'
      document.title = this.error.title
    }
  }

}))

Alpine.start()
