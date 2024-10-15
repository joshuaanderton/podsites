import Episode from './episode'

export default class Podcast {

  title: string

  description: string

  image: string

  link: string

  categories: string[]

  items: Episode[]

  constructor(data: {
    title: any;
    description: any;
    link: any;
    image: any;
    category: any;
    items: any[];
  }) {
    this.title = data.title
    this.description = data.description
    this.image = data.image
    this.link = data.link
    this.categories = data.category || []
    this.items = data.items.map(item => new Episode(item))
  }

  find(id: string): Episode|null {
    return this.items.find(episode => episode.id === id) || null
  }

}
