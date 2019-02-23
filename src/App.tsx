import React, { useEffect, useState } from 'react';
import fetcher from './services/fetcher';
import rssParser, { Channel } from './services/rss-parser';
import Content from './components/item/content';
import FeedList from './components/feed/list';

export default function App() {
  const [feed, setFeed] = useState({} as Channel);
  useEffect(() => {
    fetcher('/test.rss.xml').then((feed) => {
      if (feed) {
        const data = rssParser(feed);
        setFeed(data);
      }
    });
  }, []);

  const [article, setArticle] = useState('');

  if (!feed.channel || !feed.channel.items) {
    return <p>...</p>;
  }

  const selectedArticle = feed.channel.items.find(
    (item) => (item.guid === article ? true : false),
  );

  return (
    <main className="flex h-screen">
      <nav className="w-1/6 bg-grey overflow-y-auto overflow-x-hidden p-3">
        <header>
          <h1 className="text-lg">Seymour</h1>
        </header>
      </nav>
      <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
        <header>
          <h1 className="text-lg">Overreacted</h1>
          <FeedList items={feed.channel.items} onSelect={(item) => setArticle(item)} />
        </header>
      </section>
      <article className="w-1/2 bg-white flex flex-col">
        <header className="p-3">
          <h1 className="text-lg">
            {selectedArticle ? selectedArticle.title : feed.channel.items[0].title}
          </h1>
        </header>
        <Content
          markup={
            selectedArticle ? selectedArticle.content : feed.channel.items[0].content
          }
        />
      </article>
    </main>
  );
}
