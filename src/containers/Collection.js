import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';

import withTabs from '../hoc/withTabs';
import { withRouterProps } from '../hoc/withRouterProps';

import CollectionMetadata from './collection/CollectionMetadata';
import CollectionContent from './collection/CollectionContent';
import CollectionCollection from './collection/CollectionCollection';
import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';

import TitleHeader from '../components/ui/TitleHeader';
import CollectionRemove from '../components/collection/CollectionRemove';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

const COLLECTION_METADATA_TAB = 'COLLECTION_METADATA_TAB';
const COLLECTION_COLLECTION_TAB = 'COLLECTION_COLLECTION_TAB';
const COLLECTION_CONTENT_TAB = 'COLLECTION_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const COLLECTION_REMOVE_DIALOG = 'COLLECTION_REMOVE_DIALOG';
const COLLECTION_ACCESSCONTROL_ADD_DIALOG = 'COLLECTION_ACCESSCONTROL_ADD_DIALOG';

const TAB_TITLE = [
  { tab: COLLECTION_METADATA_TAB, listText: 'Metadata', component: CollectionMetadata },
  { tab: COLLECTION_CONTENT_TAB, listText: 'Content', component: CollectionContent },
  { tab: COLLECTION_COLLECTION_TAB, listText: 'Collection', component: CollectionCollection },
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


class Collection extends React.PureComponent {
  componentDidMount() {
    const { collectionId } = this.props;
    document.title = `vidi.js | Collection | ${collectionId}`;
  }

  render() {
    const {
      onChangeTab,
      tabValue,
      collectionId,
      history,
    } = this.props;
    const tabInfo = TAB_TITLE.find(thisTab => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = props => (
      <TitleHeader
        grandParentTitle="Collection"
        grandParentTo="/collection/"
        parentTitle={collectionId}
        title={listText}
        removeModal={COLLECTION_REMOVE_DIALOG}
        helpTo="/ref/collection.html"
        entityId={collectionId}
        entityType="collection"
        addAccessControl={COLLECTION_ACCESSCONTROL_ADD_DIALOG}
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
          collectionId={collectionId}
          entityId={collectionId}
          entityType="collection"
        />
        <CollectionRemove
          dialogName={COLLECTION_REMOVE_DIALOG}
          onSuccess={() => history.push('/collection/')}
          collectionId={collectionId}
        />
        <AccessControlDialog
          dialogName={COLLECTION_ACCESSCONTROL_ADD_DIALOG}
          entityType="collection"
          entityId={collectionId}
        />
      </React.Fragment>
    );
  }
}

export default compose(withTabs(COLLECTION_CONTENT_TAB), withRouterProps)(Collection);
