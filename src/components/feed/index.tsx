import * as React from 'react';
import FeedList from './list';

interface Props {
  feedItems: Channel['channel']['items'];
  dispatchSelect: (item: string) => unknown;
}

export default function Feed({ feedItems, dispatchSelect }: Props) {
  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      <header>
        <h1 className="text-lg">Overreacted</h1>
        <FeedList items={feedItems} dispatchSelect={dispatchSelect} />
      </header>
    </section>
  );
}
