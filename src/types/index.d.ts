type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : never;

interface Channel {
  channel: {
    id: string;
    title: string;
    description: string;
    link: string;
    lastBuildDate: number;
    items?: {
      content: string;
      description: string;
      guid: string;
      id: string;
      link: string;
      pubDate: number;
      title: string;
    }[];
  };
}
