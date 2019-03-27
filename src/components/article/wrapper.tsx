import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function ArticleWrapper({ children }: Props) {
  return <article className="w-1/2 bg-white flex flex-col">{children}</article>;
}
