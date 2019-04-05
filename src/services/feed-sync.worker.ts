import db, { Item, Channel } from './db';
import fetcher from './fetcher';
import rssParser, { RSSItem } from './rss-parser';
import logger from '../utils/logger';

const log = logger.setLevel('feed-sync');

export async function syncFeedsWorker(id?: number) {
  try {
    log('starting feed sync');
    const channelPromises = await fetchFeeds(id);

    channelPromises.forEach(async (channelPromise) => {
      const channel = await channelPromise;

      if (!channel || !channel.items) {
        return;
      }

      let count = 0;
      channel.items.forEach(async (item, index, array) => {
        if (await checkItem(item)) {
          count += 1;
          saveItem(item, channel.id as number);
        }

        const lastIteration = index === array.length - 1;
        if (lastIteration) {
          updateChannelUnreadCount(channel.id, channel.unreadCount + count);
        }
      });
    });
  } catch (e) {
    logger.error('Failed to sync feeds', e.message);
  }
}

async function fetchFeeds(id?: number) {
  const channels = id ? [await db.channels.get(id)] : await db.channels.toArray();
  log('channels in db', channels.length);

  return channels.map(async (channel) => {
    if (!channel) {
      return null;
    }
    log('fetching channel', channel.id);
    const feed = await fetcher(channel.feedUrl);

    log('fetched the feed', !!feed);
    return {
      ...rssParser(feed),
      id: channel.id as number,
      unreadCount: channel.unreadCount,
    };
  });
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

function updateChannelUnreadCount(channelId: number, newCount: number): Promise<number> {
  log('updating unread count');

  return db.channels.update(channelId, {
    unreadCount: newCount,
  });
}

export default function startFeedSync(interval: number = 10000) {
  setInterval(syncFeedsWorker, interval);
}
