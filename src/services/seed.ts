import DB from './db';
import fetcher from './fetcher';
import rssParser from './rss-parser';

export default async function seedData() {
  const feed = await fetcher('/test.rss.xml');

  if (!feed) {
    return;
  }

  const { channel } = rssParser(feed);
  const { title, slug, description, link, lastBuildDate, items } = channel;

  const channelId = await DB.channels.set({
    title,
    slug,
    description,
    link,
    lastBuildDate,
    lastFetched: Date.now(),
  });

  items && items.forEach((item) => {
    DB.items.set({
      channelId,
      read: false,
      ...item
    });
  });
}
