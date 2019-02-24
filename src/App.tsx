import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import fetcher from './services/fetcher';
import rssParser from './services/rss-parser';

import Chrome from './components/chrome';
import Feed from './components/feed';
import Article from './components/article';

type Article = ArrayElement<Channel['channel']['items']>;

export default function App() {
  const [feed, setFeed] = useState({} as Channel);
  const [selectedArticleId, setSelecedArticleId] = useState('');

  useEffect(() => {
    fetcher('/test.rss.xml').then((feed) => {
      if (feed) {
        const data = rssParser(feed);
        setFeed(data);
      }
    });
  }, []);

  if (!feed.channel || !feed.channel.items) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const selectedArticle = feed.channel.items.find(
    (item) => item.guid === selectedArticleId,
  );
  const currentArticle: Article = selectedArticle
    ? selectedArticle
    : feed.channel.items[0];

  const handleSelectedFeed = (item: string) => setSelecedArticleId(item);

  return (
    <Router>
      <Chrome>
        <Route
          path="/:feed_name"
          component={() => (
            <Feed feedItems={feed.channel.items} dispatchSelect={handleSelectedFeed} />
          )}
        />
        <Route
          path="/:feed_name/:id"
          component={() => (
            <Article title={currentArticle.title} content={currentArticle.content} />
          )}
        />
      </Chrome>
    </Router>
  );
}
