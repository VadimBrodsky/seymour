import Dexie from 'dexie';
import { DB_NAME } from '../utils/config';

class DB extends Dexie {
  public channels: Dexie.Table<Channel, number>;
  public items: Dexie.Table<Item, number>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      channels: '++id',
      items: '++id,channelId',
    });

    this.channels = this.table('channels');
    this.items = this.table('items');
  }
}

export interface Channel {
  id?: number;
  title: string;
  slug: string;
  description: string;
  link: string;
  lastBuildDate: number;
  lastFetched: number;
}

export interface Item {
  id?: number;
  channelId: number;
  content: string;
  description: string;
  guid: string;
  link: string;
  pubDate: number;
  slug: string;
  title: string;
  read: boolean;
  fetchDate: number;
}

const seymourDB = new DB();

export default seymourDB;
