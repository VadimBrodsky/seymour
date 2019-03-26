import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  children?: React.ReactNode;
  channels: any;
}

function Navigation({ children, channels }: Props) {
  return (
    <nav className="w-1/6 bg-grey overflow-y-auto overflow-x-hidden p-3">
      <header>
        <h1 className="text-lg">
          <Link to="/" className="no-underline text-black">
            Seymour
          </Link>
        </h1>
      </header>
      {channels.map((channel: any) => (
        <Link key={channel.id} to={`/channel/${channel.slug}`}>
          {channel.title}
        </Link>
      ))}
      {children}
    </nav>
  );
}

// @ts-ignore
const mapStateToProps = ({ channels }) => ({ channels: channels.loaded });
export default connect(mapStateToProps)(Navigation);
