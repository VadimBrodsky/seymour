import fetcher from './fetcher';
import rssParser from './rss-parser';
import db from '../services/db';
import { SEED_URL } from '../utils/config';

async function fetchData() {
  // const feedUrl = SEED_URL;
  const feedUrl = 'https://overreacted.io/rss.xml';
  const feed = await fetcher(feedUrl);

  if (!feed) {
    return;
  }

  const { title, slug, description, link, lastBuildDate, items } = rssParser(feed);

  const channelId = await db.channels.add({
    title,
    feedUrl,
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
      read: 0 as 0,
    }));
    db.items.bulkAdd(itemsWithRel);
  }
}

export default async function seedData() {
  true && fetchData();
}

false && seedData();
