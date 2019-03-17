import fetcher from './fetcher';
import rssParser from './rss-parser';
import Channel from '../models/channel';
import DB from './db';

async function fetchData() {
  const feed = await fetcher('/test.rss.xml');

  if (!feed) {
    return;
  }

  const {
    channel: { title, slug, description, link, lastBuildDate, items },
  } = rssParser(feed);

  const db = new DB('items');
  const channel = new Channel({ title, slug, description, link, lastBuildDate });
  const channelId = await channel.create();

  items && items.forEach((item) => {
    db.create({
      channelId,
      read: false,
      ...item
    });
  });

}

export default async function seedData() {
  const ci = new DB('channels');
  const di = new DB('items');

  false && fetchData();
}

false && seedData();
