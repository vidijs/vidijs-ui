import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';

import withTabs from '../hoc/withTabs';
import { withRouterProps } from '../hoc/withRouterProps';

import LibrarySettings from './library/LibrarySettings';
import LibraryContent from './library/LibraryContent';
import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';

import LibraryTitle from '../components/library/LibraryTitle';
import LibraryRemove from '../components/library/LibraryRemove';
import LibraryUpdate from '../components/library/LibraryUpdate';
import LibraryItemMetadata from '../components/library/LibraryItemMetadata';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

const LIBRARY_SETTINGS_TAB = 'LIBRARY_SETTINGS_TAB';
const LIBRARY_CONTENT_TAB = 'LIBRARY_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';

const LIBRARY_REMOVE_DIALOG = 'LIBRARY_REMOVE_DIALOG';
const LIBRARY_UPDATE_DIALOG = 'LIBRARY_UPDATE_DIALOG';
const LIBRARY_ITEM_METADATA_DIALOG = 'LIBRARY_ITEM_METADATA_DIALOG';
const LIBRARY_ACCESSCONTROL_ADD_DIALOG = 'LIBRARY_ACCESSCONTROL_ADD_DIALOG';

const TAB_TITLE = [
  { tab: LIBRARY_SETTINGS_TAB, listText: 'Settings', component: LibrarySettings },
  { tab: LIBRARY_CONTENT_TAB, listText: 'Content', component: LibraryContent },
  { tab: ACCESS_TAB, listText: 'Direct Access', component: AccessControl },
  { tab: ACCESSMERGED_TAB, listText: 'Merged Access', component: AccessControlMerged },
  { tab: STORAGERULE_TAB, listText: 'Storage Rules', component: StorageRule },
];

const listComponent = ({ onChangeTab, tabValue }) => (
  <List>
    {TAB_TITLE.map(({ tab, listText }) => (
      <DrawerListItem
        listText={listText}
        listItemProps={{
          onClick: () => onChangeTab(null, tab),
          selected: tabValue === tab || undefined,
        }}
      />
    ))}
  </List>
);


class Library extends React.PureComponent {
  componentDidMount() {
    const { libraryId } = this.props;
    document.title = `vidi.js | Library | ${libraryId}`;
  }

  render() {
    const {
      onChangeTab,
      tabValue,
      libraryId,
      history,
    } = this.props;
    const tabInfo = TAB_TITLE.find(thisTab => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = props => (
      <LibraryTitle
        libraryId={libraryId}
        removeModal={LIBRARY_REMOVE_DIALOG}
        updateModal={LIBRARY_UPDATE_DIALOG}
        itemMetadataModal={LIBRARY_ITEM_METADATA_DIALOG}
        addAccessControl={LIBRARY_ACCESSCONTROL_ADD_DIALOG}
        title={listText}
        {...props}
      />
    );
    return (
      <React.Fragment>
        <DrawerContainer
          mainComponent={mainComponent}
          listComponent={listComponent}
          defaultOpen
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          titleComponent={titleComponent}
          libraryId={libraryId}
          entityId={libraryId}
          entityType="library"
        />
        <LibraryUpdate
          dialogName={LIBRARY_UPDATE_DIALOG}
          libraryId={libraryId}
        />
        <LibraryRemove
          dialogName={LIBRARY_REMOVE_DIALOG}
          onSuccess={() => history.push('/library/')}
          libraryId={libraryId}
        />
        <LibraryItemMetadata
          dialogName={LIBRARY_ITEM_METADATA_DIALOG}
          libraryId={libraryId}
        />
        <AccessControlDialog
          dialogName={LIBRARY_ACCESSCONTROL_ADD_DIALOG}
          entityType="library"
          entityId={libraryId}
        />
      </React.Fragment>
    );
  }
}

export default compose(withTabs(LIBRARY_SETTINGS_TAB), withRouterProps)(Library);
