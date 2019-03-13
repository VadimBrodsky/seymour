import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

export default function Navigation({ children }: Props) {
  return (
    <nav className="w-1/6 bg-grey overflow-y-auto overflow-x-hidden p-3">
      <header>
        <h1 className="text-lg">
          <Link to="/" className="no-underline text-black">
            Seymour
          </Link>
        </h1>
      </header>
      {children}
    </nav>
  );
}
