import * as React from 'react';
import css from './frame-styles';

export default function ArticleFrame({ title, markup }: { title: string, markup: string }) {
  const iframeEl = React.useRef(null);

  React.useEffect(() => {
    if (iframeEl && iframeEl.current) {
      // @ts-ignore
      const iframeDoc = iframeEl.current.contentDocument;
      // @ts-ignore
      const iframeWindow = iframeEl.current.contentWindow;

      iframeDoc.open();
      // iframeDoc.write(markup);
      iframeDoc.close();

      // change the base to have links open in a new tab
      const base = document.createElement('base');
      base.target = "_blank";
      iframeDoc.head.appendChild(base);

      iframeWindow.scrollTo(0,0);

      const styleTag = document.createElement('link');
      styleTag.rel = 'stylesheet';
      styleTag.href = process.env.PUBLIC_URL + '/frame.css';

      const styles = document.createElement('style');
      styles.innerText = css;
      iframeDoc.head.appendChild(styles);

      const article = document.createElement('main');
      article.innerHTML = markup;
      article.className = 'container';
      iframeDoc.body.appendChild(article);
    }
  }, [markup]);

  return (
    // @ts-ignore
    <iframe
      title={title}
      csp="default-src 'self'"
      allowtransparency="allowtransparency"
      sandbox="allow-same-origin allow-popups"
      ref={iframeEl}
      className="w-full flex-grow scrolling-touch"
    />
  );
}
