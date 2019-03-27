import * as React from 'react';

interface Props {
  title: string;
}

export default function ArticleHeader({ title }: Props) {
  return (
    <header className="p-3">
      <h1 className="text-lg">{title}</h1>
    </header>
  );
}
