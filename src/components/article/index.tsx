import * as React from 'react';
import Content from './content';

interface Props {
  title: string;
  content: string;
}

export default function Article({ title, content }: Props) {
  return (
    <article className="w-1/2 bg-white flex flex-col">
      <header className="p-3">
        <h1 className="text-lg">{title}</h1>
      </header>
      <Content markup={content} />
    </article>
  );
}
