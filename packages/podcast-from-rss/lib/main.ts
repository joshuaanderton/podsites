import { parse } from 'rss-to-json'
import Podcast from './podcast'

export default async (url: string): Promise<Podcast|null> => await parse(url).then(data => new Podcast(data))
