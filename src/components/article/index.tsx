import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleContainer from './container';

interface Props {
  channels: any;
  items: any;
  selectedArticle: any;
}

function Article({ selectedArticle }: Props) {
  if (! selectedArticle) {
    return <p>loading...</p>;
  }

  // const currentArticle = selectedArticle ? selectedArticle : items[0];
  return <ArticleContainer title={selectedArticle.title} content={selectedArticle.content} />;
}

// @ts-ignore
function mapStateToProps(state, props) {
  return {
    selectedArticle:
      state.items.loaded &&
      state.items.loaded.find((item: any) => item.slug === props.match.params.articleId),
  };
}

export default withRouter(connect(mapStateToProps)(Article));
