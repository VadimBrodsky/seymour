import * as React from 'react';

export default function Frame({ markup }: { markup: string }) {
  const iframeEl = React.useRef(null);

  React.useEffect(() => {
    if (iframeEl && iframeEl.current) {
      // @ts-ignore
      const iframeDoc = iframeEl.current.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(markup);
      iframeDoc.close();

      // change the base to have links open in a new tab
      const base = document.createElement('base');
      base.target = "_blank";
      iframeDoc.head.appendChild(base);
    }
  }, []);

  return (
    // @ts-ignore
    <iframe
      csp="default-src 'self'"
      allowtransparency="allowtransparency"
      sandbox="allow-same-origin allow-popups"
      ref={iframeEl}
    />
  );
}
