import DB from '../utils/db';

type ItemConstructor = Pick<
  Item,
  'channelId' | 'content' | 'description' | 'guid' | 'link' | 'pubDate' | 'slug' | 'title'
>;

export default class Item {
  public channelId: IDBValidKey;
  public content: string;
  public description: string;
  public guid: string;
  public link: string;
  public pubDate: number;
  public slug: string;
  public title: string;

  public readonly read: boolean;
  public readonly fetchDate: number;
  protected id: IDBValidKey | undefined;

  private static db: DB = (Item.db = new DB('items'));

  constructor(options: ItemConstructor) {
    this.channelId = options.channelId;
    this.content = options.content;
    this.description = options.description;
    this.guid = options.guid;
    this.slug = options.slug;
    this.link = options.link;
    this.pubDate = options.pubDate;
    this.title = options.title;
    this.read = false;
    this.fetchDate = Date.now();
  }

  async create() {
    this.id = await Item.db.create({
      channelId: this.channelId,
      content: this.content,
      description: this.description,
      guid: this.guid,
      slug: this.slug,
      link: this.link,
      pubDate: this.pubDate,
      title: this.title,
      read: this.read,
      fetchDate: this.fetchDate,
    });
    return this.id;
  }

  static async getAllByChannelId(channel: number) {
    const key = IDBKeyRange.only(channel);
    return Item.db.getAllByIndex('channel', key);
  }
}
