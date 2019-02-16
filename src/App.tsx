import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fetcher from './services/fetcher';
import rssParser, { Channel } from './services/rss-parser';
import Content from './components/item/content';

export default function App() {
  const [feed, setFeed] = useState({} as Channel);
  useEffect(() => {
    fetcher('/test.rss.xml').then((feed) => {
      if (feed) {
        const data = rssParser(feed);
        setFeed(data);
      }
    });
  });

  if (!feed.channel || !feed.channel.items) {
    return <p>...</p>;
  }

  return (
    <main>
      {feed.channel.items.slice(0,1).map((item) => (
        <article key={item.guid}>
          <header>
            <h1>{item.title}</h1>
            <Content markup={item.content} />
          </header>
        </article>
      ))}
    </main>
  );
}
