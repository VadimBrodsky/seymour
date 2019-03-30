import * as React from 'react';

interface Props {
  error?: string;
  onInputValue: (value: string) => unknown;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown;
  value: string;
}

export default function SubscriptionLoader(props: Props) {
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    props.onInputValue(e.target.value);
  };

  return (
    <>
      <h2 className="text-lg mb-1">Subscribe to a new RSS Channel</h2>
      <form className="" onSubmit={props.onSubmit}>
        <label htmlFor="url" className="block text-grey-darker text-sm font-bold mb-2">
          Feed URL
        </label>
        <input
          id="url"
          value={props.value}
          onChange={handleOnChange}
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 mr-1 text-grey-darker focus:outline-none focus:shadow-outline"
          placeholder="https://overreacted.io/rss.xml"
        />
        <button
          className="bg-blue shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Load Feed
        </button>

        {props.error && <p className="text-red text-xs italic">{props.error}</p>}
      </form>
    </>
  );
}
