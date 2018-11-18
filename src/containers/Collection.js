import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { compose } from 'redux';

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

const COLLECTION_METADATA_TAB = 'COLLECTION_METADATA_TAB';
const COLLECTION_COLLECTION_TAB = 'COLLECTION_COLLECTION_TAB';
const COLLECTION_CONTENT_TAB = 'COLLECTION_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const COLLECTION_REMOVE_DIALOG = 'COLLECTION_REMOVE_DIALOG';

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
    const titleComponent = props => (
      <TitleHeader
        parentTitle="Collection"
        parentTo="/collection/"
        title={collectionId}
        removeModal={COLLECTION_REMOVE_DIALOG}
        helpTo="/ref/collection.html"
        entityId={collectionId}
        entityType="collection"
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
        <Tab label="Content" value={COLLECTION_CONTENT_TAB} />
        <Tab label="Metadata" value={COLLECTION_METADATA_TAB} />
        <Tab label="Collection" value={COLLECTION_COLLECTION_TAB} />
        <Tab label="Direct Access" value={ACCESS_TAB} />
        <Tab label="Merged Access" value={ACCESSMERGED_TAB} />
        <Tab label="Storage Rules" value={STORAGERULE_TAB} />
      </Tabs>
    );
    return (
      <React.Fragment>
        {tabValue === COLLECTION_CONTENT_TAB && (
          <CollectionContent
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            collectionId={collectionId}
          />
        )}
        {tabValue === COLLECTION_METADATA_TAB && (
          <CollectionMetadata
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            collectionId={collectionId}
          />
        )}
        {tabValue === COLLECTION_COLLECTION_TAB && (
          <CollectionCollection
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            collectionId={collectionId}
          />
        )}
        {tabValue === ACCESS_TAB && (
          <AccessControl
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={collectionId}
            entityType="collection"
          />
        )}
        {tabValue === ACCESSMERGED_TAB && (
          <AccessControlMerged
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={collectionId}
            entityType="collection"
          />
        )}
        {tabValue === STORAGERULE_TAB && (
          <StorageRule
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={collectionId}
            entityType="collection"
          />
        )}
        <CollectionRemove
          dialogName={COLLECTION_REMOVE_DIALOG}
          onSuccess={() => history.push('/collection/')}
          collectionId={collectionId}
        />
      </React.Fragment>
    );
  }
}

export default compose(withTabs(COLLECTION_CONTENT_TAB), withRouterProps)(Collection);
