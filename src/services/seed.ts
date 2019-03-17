import fetcher from './fetcher';
import rssParser from './rss-parser';
import Channel from '../models/channel';
import Item from '../models/item';
import DB from '../utils/db';

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

  items && items.forEach((item) => new Item({ channelId, ...item }).create());
}

export default async function seedData() {
  const ci = new DB('channels');
  const di = new DB('items');

  false && fetchData();

  // debugger;
}

false && seedData();
