import * as React from 'react';
import Frame from './frame';

export default function Content({ markup }: { markup: string }) {
  React.useEffect(() => {});
  // const parser = new DOMParser();
  // const dom = parser.parseFromString(markup, 'text/html');
  // console.log(dom);
  // return <main dangerouslySetInnerHTML={{ __html: markup }} />;
  return <Frame markup={markup} />
}
