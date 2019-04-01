import slugify from '../utils/slugify';

const getText = (node: Element | null): string =>
  node && node.textContent ? node.textContent : '';

export default function rssParser(feed: string): RSSChannel {
  const parser = new DOMParser();
  const doc = parser.parseFromString(feed, 'application/xml');

  const parsedData = {
    title: getText(doc.querySelector('channel title')),
    slug: slugify((getText(doc.querySelector('channel title')) || '')),
    description: getText(doc.querySelector('channel description')),
    link: getText(doc.querySelector('channel link')),
    lastBuildDate: Date.parse(getText(doc.querySelector('channel lastBuildDate'))),
    lastFetched: Date.now(),
    items: Array.from(doc.querySelectorAll('item'), (item) => ({
      title: getText(item.querySelector('title')),
      slug: new URL(getText(item.querySelector('link'))).pathname.replace(/\//g, ''),
      description: getText(item.querySelector('description')),
      link: getText(item.querySelector('link')),
      guid: getText(item.querySelector('guid')),
      pubDate: Date.parse(getText(item.querySelector('pubDate'))),
      content: getText(item.querySelector('encoded')),
    })),
  };

  if (parsedData.title === '' || parsedData.link === '') {
    throw new Error('Could not parse the XML feed');
  }

  return parsedData;
}

export interface RSSChannel {
  title: string;
  slug: string;
  description: string;
  link: string;
  lastBuildDate: number;
  lastFetched: number;
  items?: RSSItem[];
}

export interface RSSItem {
  content: string;
  description: string;
  guid: string;
  slug: string;
  link: string;
  pubDate: number;
  title: string;
}
