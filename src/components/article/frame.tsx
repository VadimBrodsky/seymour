import * as React from 'react';

export default function ArticleFrame({ title, markup }: { title: string, markup: string }) {
  const iframeEl = React.useRef(null);

  React.useEffect(() => {
    if (iframeEl && iframeEl.current) {
      // @ts-ignore
      const iframeDoc = iframeEl.current.contentDocument;
      // @ts-ignore
      const iframeWindow = iframeEl.current.contentWindow;

      iframeDoc.open();
      iframeDoc.write(markup);
      iframeDoc.close();

      // change the base to have links open in a new tab
      const base = document.createElement('base');
      base.target = "_blank";
      iframeDoc.head.appendChild(base);
      iframeDoc.body.id = 'article';

      iframeWindow.scrollTo(0,0);

      const styles = document.createElement('style');
      styles.innerText = 'body { margin: 0; padding: 0 0.75rem 0 0.75rem; }';
      iframeDoc.head.appendChild(styles);
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
