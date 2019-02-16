import * as React from 'react';

export default function Content({ markup }: { markup: string }) {
  React.useEffect(() => {});
  // const parser = new DOMParser();
  // const dom = parser.parseFromString(markup, 'text/html');
  // console.log(dom);
  return <main dangerouslySetInnerHTML={{ __html: markup }} />;
}
