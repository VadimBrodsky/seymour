import * as React from 'react';
import { connect } from 'react-redux';
import SidebarWrapper from './wrapper';
import SidebarHeader from './header';
import ChannelsNav from './channels-nav';
import Loading from '../shared/loading';
import { AppState } from '../../reducers';
import { handleSyncAllChannels } from '../../actions/channels';

interface Props {
  channels: AppState['channels']['loaded'] | [];
  loading: boolean;
  dispatch: (arg: any) => void;
}

function Sidebar({ channels, loading, dispatch }: Props) {
  return (
    <SidebarWrapper>
      <SidebarHeader title="Seymour" />
      {loading ? <Loading /> : <ChannelsNav channels={channels} />}
      <button
        className="flex-no-shring bg-blue hover:bg-blue-dark border-blue hover:border-blue-dark text-sm border-4 text-white py-1 px-2 rounded"
        onClick={() => dispatch(handleSyncAllChannels())}
      >
        Sync Feeds
      </button>
    </SidebarWrapper>
  );
}

const mapStateToProps = ({ channels }: AppState) => ({
  channels: channels.loaded,
  loading: channels.loaded.length === 0,
});
export default connect(mapStateToProps)(Sidebar);
