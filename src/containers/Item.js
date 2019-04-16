import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { compose } from 'redux';

import withTabs from '../hoc/withTabs';
import { withRouterProps } from '../hoc/withRouterProps';

import ItemMetadata from './item/ItemMetadata';
import ItemCollection from './item/ItemCollection';
import ItemShape from './item/ItemShape';
import ItemContent from './item/ItemContent';
import ItemUri from './item/ItemUri';
import ItemPoster from './item/ItemPoster';
import ItemThumbnail from './item/ItemThumbnail';
import ItemJob from './item/ItemJob';
import ItemProjection from './item/ItemProjection';

import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';

import ItemTitle from '../components/item/ItemTitle';
import ItemDelete from '../components/item/ItemDelete';
import ItemTranscode from '../components/item/ItemTranscode';
import ItemThumbnailDialog from '../components/item/ItemThumbnail';
import ItemExport from '../components/item/ItemExport';
import ItemImpExport from '../components/item/ItemImpExport';
import CollectionEntityAdd from '../components/collection/CollectionEntityAdd';
import JobCreate from '../components/job/JobCreate';
import AccessControlDialog from '../components/access/AccessControlDialog';

const ITEM_METADATA_TAB = 'ITEM_METADATA_TAB';
const ITEM_COLLECTION_TAB = 'ITEM_COLLECTION_TAB';
const ITEM_SHAPE_TAB = 'ITEM_SHAPE_TAB';
const ITEM_URI_TAB = 'ITEM_URI_TAB';
const ITEM_CONTENT_TAB = 'ITEM_CONTENT_TAB';
const ITEM_THUMBNAIL_TAB = 'ITEM_THUMBNAIL_TAB';
const ITEM_POSTER_TAB = 'ITEM_POSTER_TAB';
const ITEM_JOB_TAB = 'ITEM_JOB_TAB';
const ITEM_PROJECTION_TAB = 'ITEM_PROJECTION_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';

const ITEM_REMOVE_DIALOG = 'ITEM_REMOVE_DIALOG';
const ITEM_TRANSCODE_DIALOG = 'ITEM_TRANSCODE_DIALOG';
const ITEM_THUMBNAIL_DIALOG = 'ITEM_THUMBNAIL_DIALOG';
const ITEM_POSTER_DIALOG = 'ITEM_POSTER_DIALOG';
const ITEM_EXPORT_DIALOG = 'ITEM_EXPORT_DIALOG';
const ITEM_IMPEXPORT_DIALOG = 'ITEM_IMPEXPORT_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';
const JOB_CREATE_DIALOG = 'JOB_CREATE_DIALOG';
const ITEM_ACCESSCONTROL_ADD_DIALOG = 'ITEM_ACCESSCONTROL_ADD_DIALOG';

class Item extends React.PureComponent {
  componentDidMount() {
    const { itemId } = this.props;
    document.title = `vidi.js | Item | ${itemId}`;
  }

  render() {
    const {
      onChangeTab,
      tabValue,
      itemId,
      history,
    } = this.props;
    const titleComponent = props => (
      <ItemTitle
        itemId={itemId}
        removeModal={ITEM_REMOVE_DIALOG}
        transcodeModal={ITEM_TRANSCODE_DIALOG}
        thumbnailModal={ITEM_THUMBNAIL_DIALOG}
        posterModal={ITEM_POSTER_DIALOG}
        exportModal={ITEM_EXPORT_DIALOG}
        exportImpModal={ITEM_IMPEXPORT_DIALOG}
        addToCollectionModal={COLLECTION_ENTITY_ADD_DIALOG}
        startJobModal={JOB_CREATE_DIALOG}
        addAccessControl={ITEM_ACCESSCONTROL_ADD_DIALOG}
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
        <Tab label="Metadata" value={ITEM_METADATA_TAB} />
        <Tab label="Content" value={ITEM_CONTENT_TAB} />
        <Tab label="Collection" value={ITEM_COLLECTION_TAB} />
        <Tab label="Shape" value={ITEM_SHAPE_TAB} />
        <Tab label="URI" value={ITEM_URI_TAB} />
        <Tab label="Thumbnail" value={ITEM_THUMBNAIL_TAB} />
        <Tab label="Poster" value={ITEM_POSTER_TAB} />
        <Tab label="Job" value={ITEM_JOB_TAB} />
        <Tab label="Projection" value={ITEM_PROJECTION_TAB} />
        <Tab label="Direct Access" value={ACCESS_TAB} />
        <Tab label="Merged Access" value={ACCESSMERGED_TAB} />
        <Tab label="Storage Rules" value={STORAGERULE_TAB} />
      </Tabs>
    );
    return (
      <React.Fragment>
        {tabValue === ITEM_METADATA_TAB && (
          <ItemMetadata
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_CONTENT_TAB && (
          <ItemContent
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_COLLECTION_TAB && (
          <ItemCollection
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_SHAPE_TAB && (
          <ItemShape
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_URI_TAB && (
          <ItemUri
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_JOB_TAB && (
          <ItemJob
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_PROJECTION_TAB && (
          <ItemProjection
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_THUMBNAIL_TAB && (
          <ItemThumbnail
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ITEM_POSTER_TAB && (
          <ItemPoster
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            itemId={itemId}
          />
        )}
        {tabValue === ACCESS_TAB && (
          <AccessControl
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={itemId}
            entityType="item"
          />
        )}
        {tabValue === ACCESSMERGED_TAB && (
          <AccessControlMerged
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={itemId}
            entityType="item"
          />
        )}
        {tabValue === STORAGERULE_TAB && (
          <StorageRule
            titleComponent={titleComponent}
            tabComponent={tabComponent}
            entityId={itemId}
            entityType="item"
          />
        )}
        <ItemDelete
          dialogName={ITEM_REMOVE_DIALOG}
          onSuccess={() => history.push('/item/?content=metadata%2Cthumbnail&baseURI=%2FAPInoauth%2F&terse=true&noauth-url=true')}
          itemId={itemId}
        />
        <ItemTranscode
          dialogName={ITEM_TRANSCODE_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemThumbnailDialog
          dialogName={ITEM_THUMBNAIL_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          variant="thumbnail"
        />
        <ItemThumbnailDialog
          dialogName={ITEM_POSTER_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          variant="poster"
        />
        <ItemExport
          dialogName={ITEM_EXPORT_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemImpExport
          dialogName={ITEM_IMPEXPORT_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          entityId={itemId}
          entityType="item"
        />
        <AccessControlDialog
          dialogName={ITEM_ACCESSCONTROL_ADD_DIALOG}
          entityType="item"
          entityId={itemId}
        />
        <JobCreate
          dialogName={JOB_CREATE_DIALOG}
          initialValues={{
            queryParams: {
              jobmetadata: [{
                key: 'itemId',
                value: itemId,
              }],
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default compose(withTabs(ITEM_METADATA_TAB), withRouterProps)(Item);
