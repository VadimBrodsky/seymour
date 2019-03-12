import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function Chrome({ children }: Props) {
  return (
    <main className="flex h-screen">
      {children}
    </main>
  );
}
