import DB from '../utils/db';

type ChannleConstructor = Pick<
  Channel,
  'title' | 'slug' | 'description' | 'link' | 'lastBuildDate'
>;

export default class Channel {
  public title: string;
  public slug: string;
  public description: string;
  public link: string;
  public lastBuildDate: number;
  public readonly lastFetched: number;
  protected id: IDBValidKey | undefined;

  private static db: DB = (Channel.db = new DB('channels'));

  constructor(options: ChannleConstructor) {
    this.title = options.title;
    this.slug = options.slug;
    this.description = options.description;
    this.link = options.link;
    this.lastBuildDate = options.lastBuildDate;
    this.lastFetched = Date.now();
  }

  async create() {
    this.id = await Channel.db.create({
      title: this.title,
      slug: this.slug,
      description: this.description,
      link: this.link,
      lastBuildDate: this.lastBuildDate,
      lastFetched: this.lastFetched,
    });
    return this.id;
  }

  static async getAll() {
    return Channel.db.getAll();
  }

  static async getById(id: IDBValidKey) {
    return Channel.db.read(id).then((data) => {
      const c = new Channel(data);
      c.id = id;
      return c;
    });
  }
}
