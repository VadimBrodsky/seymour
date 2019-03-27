import * as React from 'react';
import { connect } from 'react-redux';
import SidebarWrapper from './wrapper';
import SidebarHeader from './header';
import ChannelsNav from './channels-nav';
import Loading from '../shared/loading';
import { AppState } from '../../reducers';

interface Props {
  channels: AppState['channels']['loaded'] | [];
  loading: boolean;
}

function Sidebar({ channels, loading }: Props) {
  return (
    <SidebarWrapper>
      <SidebarHeader title="Seymour" />
      {loading ? <Loading /> : <ChannelsNav channels={channels} />}
    </SidebarWrapper>
  );
}

const mapStateToProps = ({ channels }: AppState) => ({
  channels: channels.loaded,
  loading: channels.loaded.length === 0,
});
export default connect(mapStateToProps)(Sidebar);
