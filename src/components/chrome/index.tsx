import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Navigation from './navigation';

interface Props {
  children?: React.ReactNode;
}

export default function Chrome({ children }: Props) {
  return (
    <main className="flex h-screen">
      <Navigation />
      {children}
    </main>
  );
}
