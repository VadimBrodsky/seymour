import * as React from 'react';
import db from '../../services/db';
import fetcher from '../../services/fetcher';
import rssParser from '../../services/rss-parser';

function Subscription() {
  const inputRef = React.useRef(null);
  const [error, setError] = React.useState(null);

  const subscribe = async (url: string) => {
    try {
      const data = await fetcher(url);
      console.log(data);
      if (data) {
        const feed = rssParser(data);
        console.log(feed);

        if (!feed.title || !feed.link) {
          throw new Error('Could not parse the XML feed');
        }

        await db.channels.add({
          title: feed.title,
          feedUrl: url,
          slug: feed.slug,
          description: feed.description,
          link: feed.link,
          lastBuildDate: feed.lastBuildDate,
          lastFetched: Date.now(),
        });

        // @ts-ignore
        inputRef.current.value = '';

        // @ts-ignore
        window.syncFeedsWorker();
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // @ts-ignore
    const val = inputRef.current.value;

    console.log(val);
    val !== '' && subscribe(val);
  };

  return (
    <section className="w-5/6 bg-grey-light p-3">
      <h2 className="text-lg mb-1">Subscribe to a new RSS Channel</h2>
      <form className="" onSubmit={onSubmit}>
        <label htmlFor="url" className="block text-grey-darker text-sm font-bold mb-2">
          Feed URL
        </label>
        <input
          id="url"
          ref={inputRef}
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 mr-1 text-grey-darker focus:outline-none focus:shadow-outline"
          placeholder="https://overreacted.io/rss.xml"
        />
        <button
          className="bg-blue shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Subscribe
        </button>

        {error && <p className="text-red text-xs italic">{error}</p>}
      </form>
    </section>
  );
}

export default Subscription;
