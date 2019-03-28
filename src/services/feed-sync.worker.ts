import db, { Item } from './db';
import fetcher from './fetcher';
import rssParser, { RSSItem } from './rss-parser';
import logger from '../utils/logger';

const log = logger.setLevel('feed-sync');

export async function syncFeedsWorker() {
  log('starting feed sync');

  try {
    const channels = await db.channels.toArray();
    log('channels in db', channels.length);

    channels.forEach(async (channel) => {
      log('fetching channel', channel.id);
      const feed = await fetcher(channel.feedUrl);
      log('fetched the feed', !!feed);
      const parsedFeed = feed && rssParser(feed);

      parsedFeed &&
        parsedFeed.items &&
        parsedFeed.items.forEach(
          async (item) => (await checkItem(item)) && saveItem(item, channel.id as number),
        );
    });
  } catch (e) {
    logger.error('Failed to sync feeds', e.message);
  }
}

async function checkItem(item: RSSItem): Promise<boolean> {
  const existingItem = await db.items.where({ guid: item.guid }).first();
  const alreadySaved = existingItem && item.pubDate === existingItem.pubDate;
  log('item already saved', alreadySaved);

  return !alreadySaved;
}

function saveItem(item: RSSItem, channelId: number): Promise<number> {
  log('adding new item');

  return db.items.add({
    ...item,
    channelId,
    fetchDate: Date.now(),
    read: 0,
  });
}

export default function startFeedSync(interval: number = 10000) {
  setInterval(syncFeedsWorker, interval);
}
