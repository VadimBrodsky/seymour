import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

export default function SidebarHeader({ title }: Props) {
  return (
    <h1 className="text-lg mb-2">
      <Link to="/" className="no-underline text-black">
        {title}
      </Link>
    </h1>
  );
}
