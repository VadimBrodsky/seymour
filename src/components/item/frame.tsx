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
    }
  }, []);

  return (
    // @ts-ignore
    <iframe
      allowtransparency="allowtransparency"
      sandbox="allow-same-origin"
      ref={iframeEl}
    />
  );
}
