type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : never;

interface Channel {
  channel: {
    title: string;
    slug: string;
    description: string;
    link: string;
    lastBuildDate: number;
    items?: {
      content: string;
      description: string;
      guid: string;
      slug: string;
      link: string;
      pubDate: number;
      title: string;
    }[];
  };
}
