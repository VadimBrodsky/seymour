import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import fetcher from './services/fetcher';
import rssParser from './services/rss-parser';

import { handleReceiveChannels } from './actions/channels'
import Navigation from './components/chrome/navigation';
import Chrome from './components/chrome';
import FeedMenu from './components/feed';
import Article from './components/article';

type Article = ArrayElement<Channel['channel']['items']>;

function App({ dispatch }: { dispatch: Dispatch}) {
  const [feed, setFeed] = useState({} as Channel);

  useEffect(() => {
    // @ts-ignore
    dispatch(handleReceiveChannels())
    // fetcher('/test.rss.xml').then((feed) => {
    //   if (feed) {
    //     const data = rssParser(feed);
    //     setFeed(data);
    //   }
    // });
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
              <Link to="/channel/overreacted">Overreacted</Link>
            </Navigation>
          )}
        />
        <Route
          path="/channel/:feedId"
          render={(...props) => <FeedMenu {...props} feedItems={feed.channel.items} />}
        />
        <Route
          path="/channel/:feedId/:articleId"
          render={({ match }) => {
            if (!feed || !feed.channel || !feed.channel.items) {
              return <p>nothing</p>;
            }

            const selectedArticle = feed.channel.items.find(
              (item) => item.slug === match.params.articleId,
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

export default connect()(App);
