import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import fetcher from './services/fetcher';
import rssParser from './services/rss-parser';

import Navigation from './components/chrome/navigation';
import Chrome from './components/chrome';
import FeedMenu from './components/feed';
import Article from './components/article';

type Article = ArrayElement<Channel['channel']['items']>;

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

  if (!feed.channel || !feed.channel.items) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Chrome>
        <Route
          path="/"
          render={() => (
            <Navigation>
              <Link to="/overreacted">Overreacted</Link>
            </Navigation>
          )}
        />
        <Route
          path="/:feedId"
          render={(...props) => <FeedMenu {...props} feedItems={feed.channel.items} />}
        />
        <Route
          path="/:feedId/:articleId"
          render={({ match }) => {
            if (!feed || !feed.channel || !feed.channel.items) {
              return <p>nothing</p>;
            }

            const selectedArticle = feed.channel.items.find(
              (item) => item.id === match.params.articleId,
            );

            const currentArticle: Article = selectedArticle
              ? selectedArticle
              : feed.channel.items[0];

            return (
              <Article title={currentArticle.title} content={currentArticle.content} />
            );
          }}
        />
      </Chrome>
    </Router>
  );
}
