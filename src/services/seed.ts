import fetcher from './fetcher';
import rssParser from './rss-parser';
import db from '../services/db';

async function fetchData() {
  const feed = await fetcher('/test.rss.xml');

  if (!feed) {
    return;
  }

  const {
    channel: { title, slug, description, link, lastBuildDate, items },
  } = rssParser(feed);


  const channelId = await db.channels.add({
    title,
    slug,
    description,
    link,
    lastBuildDate,
    lastFetched: Date.now(),
  });

  if (items) {
    const itemsWithRel = items.map((i) => ({
      ...i,
      channelId,
      fetchDate: Date.now(),
      read: false,
    }));
    db.items.bulkAdd(itemsWithRel);
  }
}

export default async function seedData() {
  false && fetchData();
}

false && seedData();
