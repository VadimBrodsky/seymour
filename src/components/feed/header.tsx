import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  url: string;
}

export default function FeedsHeader({ title, url }: Props) {
  return (
    <header>
      <h1 className="text-lg">
        <Link className="no-underline text-black" to={url}>
          {title}
        </Link>
      </h1>
    </header>
  );
}
