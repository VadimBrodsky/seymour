import DB from '../utils/db';

interface ChannleConstructor {
  title: string;
  slug: string;
  description: string;
  link: string;
  lastBuildDate: number;
}

export default class Channel {
  public title: string;
  public slug: string;
  public description: string;
  public link: string;
  public lastBuildDate: number;
  public lastFetched: number;
  protected id: IDBValidKey | undefined;

  private static db: DB = (Channel.db = new DB('channels'));

  constructor({ title, slug, description, link, lastBuildDate }: ChannleConstructor) {
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.link = link;
    this.lastBuildDate = lastBuildDate;
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

  static async getById(id: IDBValidKey) {
    return Channel.db.read(id).then((data) => {
      const c = new Channel(data);
      c.id = id;
      return c;
    });
  }
}
