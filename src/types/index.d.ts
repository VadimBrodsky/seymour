type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : never;

interface Channel {
  channel: {
    title: string;
    description: string;
    link: string;
    lastBuildDate: number;
    items?: {
      title: string;
      description: string;
      link: string;
      guid: string;
      pubDate: number;
      content: string;
    }[];
  };
}
