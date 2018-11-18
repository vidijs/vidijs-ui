import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { compose } from 'redux';

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

const LIBRARY_SETTINGS_TAB = 'LIBRARY_SETTINGS_TAB';
const LIBRARY_CONTENT_TAB = 'LIBRARY_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';

const LIBRARY_REMOVE_DIALOG = 'LIBRARY_REMOVE_DIALOG';
const LIBRARY_UPDATE_DIALOG = 'LIBRARY_UPDATE_DIALOG';
const LIBRARY_ITEM_METADATA_DIALOG = 'LIBRARY_ITEM_METADATA_DIALOG';

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
    const titleComponent = props => (
      <LibraryTitle
        libraryId={libraryId}
        removeModal={LIBRARY_REMOVE_DIALOG}
        updateModal={LIBRARY_UPDATE_DIALOG}
        itemMetadataModal={LIBRARY_ITEM_METADATA_DIALOG}
        {...props}
      />
    );
    const tabComponent = () => (
      <Tabs
        value={tabValue}
        onChange={onChangeTab}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab label="Settings" value={LIBRARY_SETTINGS_TAB} />
        <Tab label="Content" value={LIBRARY_CONTENT_TAB} />
        <Tab label="Direct Access" value={ACCESS_TAB} />
        <Tab label="Merged Access" value={ACCESSMERGED_TAB} />
        <Tab label="Storage Rules" value={STORAGERULE_TAB} />
      </Tabs>
    );
    return (
      <React.Fragment>
        {tabValue === LIBRARY_SETTINGS_TAB && (
          <LibrarySettings
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            libraryId={libraryId}
          />
        )}
        {tabValue === LIBRARY_CONTENT_TAB && (
          <LibraryContent
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            libraryId={libraryId}
          />
        )}
        {tabValue === ACCESS_TAB && (
          <AccessControl
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={libraryId}
            entityType="library"
          />
        )}
        {tabValue === ACCESSMERGED_TAB && (
          <AccessControlMerged
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={libraryId}
            entityType="library"
          />
        )}
        {tabValue === STORAGERULE_TAB && (
          <StorageRule
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={libraryId}
            entityType="library"
          />
        )}
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
      </React.Fragment>
    );
  }
}

export default compose(withTabs(LIBRARY_SETTINGS_TAB), withRouterProps)(Library);
