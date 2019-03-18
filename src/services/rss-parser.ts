const getText = (node: Element | null): string =>
  node && node.textContent ? node.textContent : '';

export default function rssParser(feed: string): Channel {
  const parser = new DOMParser();
  const doc = parser.parseFromString(feed, 'application/xml');

  return {
    channel: {
      title: getText(doc.querySelector('channel title')),
      slug: (getText(doc.querySelector('channel title')) || '').toLowerCase(),
      description: getText(doc.querySelector('channel description')),
      link: getText(doc.querySelector('channel link')),
      lastBuildDate: Date.parse(getText(doc.querySelector('channel lastBuildDate'))),
      items: Array.from(doc.querySelectorAll('item'), (item) => ({
        title: getText(item.querySelector('title')),
        slug: new URL(getText(item.querySelector('link'))).pathname.replace(/\//g, ''),
        description: getText(item.querySelector('description')),
        link: getText(item.querySelector('link')),
        guid: getText(item.querySelector('guid')),
        pubDate: Date.parse(getText(item.querySelector('pubDate'))),
        content: getText(item.querySelector('encoded')),
      })),
    },
  };
}

