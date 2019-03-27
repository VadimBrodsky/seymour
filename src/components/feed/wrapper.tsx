import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function FeedsWrapper({ children }: Props) {
  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      {children}
    </section>
  );
}
