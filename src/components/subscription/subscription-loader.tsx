import * as React from 'react';

interface Props {
  error?: string;
  onInputValue: (value: string) => unknown;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown;
  onClear: () => unknown;
  value: string;
}

export default function SubscriptionLoader(props: Props) {
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    props.onInputValue(e.target.value);
  };

  return (
    <div>
      <h2 className="text-lg mb-1">Subscribe to a new RSS Channel</h2>
      <form className="w-full max-w-md" onSubmit={props.onSubmit}>
        <div className="flex items-center border-b border-b-2 border-blue py-2">
          <input
            id="url"
            value={props.value}
            onChange={handleOnChange}
            type="text"
            className="appearance-none bg-transparent border-none w-3/4 text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Feed URL"
            aria-label="Feed URL"
          />

          <button
            className="flex-no-shring bg-blue hover:bg-blue-dark border-blue hover:border-blue-dark text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Load Feed
          </button>

          <button
            onClick={props.onClear}
            className="flex-no-shrink border-transparent border-4 text-blue hover:text-blue-darker text-sm py-1 px-2 rounded"
            type="button"
          >
            Clear
          </button>
        </div>

        {props.error && <p className="text-red text-sm italic py-2">{props.error}</p>}
      </form>
    </div>
  );
}
