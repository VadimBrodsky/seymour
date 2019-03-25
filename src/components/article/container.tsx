import * as React from 'react';
import Frame from './frame';

interface Props {
  title: string;
  content: string;
}

export default function ArticleContainer({ title, content }: Props) {
  return (
    <article className="w-1/2 bg-white flex flex-col">
      <header className="p-3">
        <h1 className="text-lg">{title}</h1>
      </header>
      <Frame markup={content} title={title} />
    </article>
  );
}
