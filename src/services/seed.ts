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

  console.log('fetched');
  console.log(db);

  console.log('populate');

  const channelId = await db.channels.add({
    title,
    slug,
    description,
    link,
    lastBuildDate,
    lastFetched: Date.now(),
  });

  console.log(channelId);

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
  // debugger;
}

false && seedData();
