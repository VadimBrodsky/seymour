import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function SubscriptionWrapper({ children }: Props) {
  return <section className="w-5/6 bg-grey-light p-3">{children}</section>;
}
