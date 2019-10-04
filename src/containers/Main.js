import React from 'react';
import grey from '@material-ui/core/colors/grey';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { withModalNoRouter } from '../hoc/withModal';

import Configuration from './Configuration';
import Indexing from './configuration/Indexing';
import FtpPool from './configuration/FtpPool';
import JobPool from './configuration/JobPool';
import Properties from './configuration/Properties';
import Metrics from './configuration/Metrics';
import LogReport from './configuration/LogReport';
import PathAlias from './configuration/PathAlias';
import Cors from './configuration/Cors';
import OAuth2 from './configuration/OAuth2';
import StorageList from './StorageList';
import Storage from './Storage';
import StorageMethod from './StorageMethod';
import ShapeTagList from './ShapeTagList';
import ShapeTag from './ShapeTag';
import Version from './Version';
import Service from './Service';
import JobTypeList from './JobTypeList';
import TaskDefinition from './TaskDefinition';
import Echo from './Echo';
import Javascript from './Javascript';
import AuditLog from './AuditLog';
import JobList from './JobList';
import Job from './Job';
import JobCreate from './job/JobCreate';
import ExportLocationList from './ExportLocationList';
import ExportLocation from './ExportLocation';
import SelfTest from './SelfTest';
import GroupList from './GroupList';
import Group from './Group';
import UserList from './UserList';
import User from './User';
import ExternalIdNamespace from './ExternalIdNamespace';
import ExternalId from './ExternalId';
import Search from './Search';
import Item from './Item';
import Collection from './Collection';
import ReindexList from './ReindexList';
import Wizard from './Wizard';
import MetadataFieldList from './MetadataFieldList';
import FieldGroupList from './FieldGroupList';
import FieldGroup from './FieldGroup';
import Import from './Import';
import FileList from './FileList';
import File from './File';
import StorageRuleList from './StorageRuleList';
import ErrorLog from './ErrorLog';
import VxaList from './VxaList';
import Vxa from './Vxa';
import LibraryList from './LibraryList';
import Library from './Library';
import DocumentMetadataList from './DocumentMetadataList';
import DocumentMetadata from './DocumentMetadata';
import Conform from './Conform';
import Metadata from './Metadata';
import ProjectionList from './ProjectionList';
import Projection from './Projection';
import MetadataField from './MetadataField';
import NotificationList from './NotificationList';
import Notification from './Notification';
import NotificationEntityList from './NotificationEntityList';
import ImportSettingsList from './ImportSettingsList';
import ImportSettings from './ImportSettings';
import ImportAccess from './ImportAccess';
import TaskGroupList from './TaskGroupList';
import TaskGroup from './TaskGroup';
import Quota from './Quota';
import ResourceTypeList from './ResourceTypeList';
import ResourceList from './ResourceList';
import Resource from './Resource';
import StorageGroupList from './StorageGroupList';
import StorageGroup from './StorageGroup';
import AutoImportRuleList from './AutoImportRuleList';
import AutoImportRule from './AutoImportRule';
import withErrorBoundary from '../hoc/withErrorBoundary';
import StackTrace from './StackTrace';
import Transfer from './Transfer';
import Shape from './Shape';
import CollectionSearch from './CollectionSearch';
import ItemSearch from './ItemSearch';
import ShapeSearch from './ShapeSearch';
import FieldGroupSearch from './FieldGroupSearch';
import ImportImp from './ImportImp';
import UserKey from './UserKey';
import ScheduledRequestList from './ScheduledRequestList';
import Stitch from './Stitch';

import TopAppBar from './TopAppBar';
import FullScreenDialog from './FullScreenDialog';
import HistoryDialog from './HistoryDialog';
import LeftSnackbar from '../components/ui/LeftSnackbar';

const HISTORY_DIALOG = 'HISTORY_DIALOG';
const MAINMENU_DIALOG = 'MAINMENU_DIALOG';

function Main({
  onOpen,
  unsetToken,
  unsetRunAs,
  userName,
  baseUrl,
}) {
  const toggleHistory = () => onOpen({ modalName: HISTORY_DIALOG });
  const toggleMainMenu = () => onOpen({ modalName: MAINMENU_DIALOG });
  const onLogout = () => {
    unsetToken();
    unsetRunAs();
  };
  return (
    <div style={{ zIndex: 1, minWidth: '100%' }}>
      <FullScreenDialog
        dialogName={MAINMENU_DIALOG}
      />
      <HistoryDialog
        dialogName={HISTORY_DIALOG}
      />
      <TopAppBar
        onLogout={onLogout}
        userName={userName}
        toggleMainMenu={toggleMainMenu}
        toggleHistory={toggleHistory}
        baseUrl={baseUrl}
      />
      <main
        style={{
          backgroundColor: grey[200],
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: 48,
        }}
      >
        <Route exact path="/" component={JobList} />
        <Route exact path="/collection/" component={CollectionSearch} />
        <Route path="/collection/:collectionId/" component={Collection} />
        <Route exact path="/configuration/" component={Configuration} />
        <Route exact path="/configuration/properties/" component={Properties} />
        <Route exact path="/configuration/indexing/" component={Indexing} />
        <Route exact path="/configuration/ftp-pool/" component={FtpPool} />
        <Route exact path="/configuration/job-pool/" component={JobPool} />
        <Route exact path="/configuration/path-alias/" component={PathAlias} />
        <Route exact path="/configuration/metrics/" component={Metrics} />
        <Route exact path="/configuration/logreport/" component={LogReport} />
        <Route exact path="/configuration/cors/" component={Cors} />
        <Route exact path="/configuration/auth/" component={OAuth2} />
        <Route exact path="/resource/" component={ResourceTypeList} />
        <Route exact path="/resource/:resourceType/" component={ResourceList} />
        <Route exact path="/resource/:resourceType/:resourceId/" component={Resource} />
        <Route exact path="/storage/" component={StorageList} />
        <Route exact path="/storage/:storageId/" component={Storage} />
        <Route exact path="/storage/:storageId/method/:storageMethodId" component={StorageMethod} />
        <Route exact path="/shape-tag/" component={ShapeTagList} />
        <Route exact path="/shape-tag/:tagName/" component={ShapeTag} />
        <Route exact path="/version/" component={Version} />
        <Route exact path="/service/" component={Service} />
        <Route exact path="/jobtype/" component={JobTypeList} />
        <Route exact path="/task-definition/jobtype/:taskDefinitionType" component={TaskDefinition} />
        <Route exact path="/debug/echo" component={Echo} />
        <Route exact path="/javascript/test" component={Javascript} />
        <Route exact path="/log" component={AuditLog} />
        <Route exact path="/job" component={JobList} />
        <Route exact path="/job/:jobId/" component={Job} />
        <Route exact path="/export-location" component={ExportLocationList} />
        <Route exact path="/export-location/:locationName/" component={ExportLocation} />
        <Route exact path="/selftest/" component={SelfTest} />
        <Route exact path="/group/" component={GroupList} />
        <Route exact path="/group/:groupName/" component={Group} />
        <Route exact path="/user/" component={UserList} />
        <Route exact path="/user/:userName/" component={User} />
        <Route exact path="/user/:userName/key" component={UserKey} />
        <Route exact path="/external-id/" component={ExternalIdNamespace} />
        <Route exact path="/search/" component={Search} />
        <Route exact path="/search/field-group/" component={FieldGroupSearch} />
        <Route exact path="/item/" component={ItemSearch} />
        <Route exact path="/shape" component={ShapeSearch} />
        <Route exact path="/item/:itemId/" component={Item} />
        <Route exact path="/item/:itemId/shape/:shapeId/" component={Shape} />
        <Route exact path="/reindex/" component={ReindexList} />
        <Route exact path="/wizard/" component={Wizard} />
        <Route exact path="/metadata-field/" component={MetadataFieldList} />
        <Route exact path="/field-group/" component={FieldGroupList} />
        <Route exact path="/field-group/:groupName" component={FieldGroup} />
        <Route exact path="/import" component={Import} />
        <Route exact path="/import-imp" component={ImportImp} />
        <Route exact path="/file/" component={FileList} />
        <Route exact path="/file/:fileId/" component={File} />
        <Route exact path="/storage-rule/" component={StorageRuleList} />
        <Route exact path="/error/" component={ErrorLog} />
        <Route exact path="/vxa/" component={VxaList} />
        <Route exact path="/vxa/:vxaUuid/" component={Vxa} />
        <Route exact path="/new-job/" component={JobCreate} />
        <Route exact path="/library/" component={LibraryList} />
        <Route path="/library/:libraryId/" component={Library} />
        <Route exact path="/document/" component={DocumentMetadataList} />
        <Route path="/document/:documentMetadataName" component={DocumentMetadata} />
        <Route path="/metadata/:metadataUuid/" component={Metadata} />
        <Route exact path="/conform/" component={Conform} />
        <Route exact path="/projection/" component={ProjectionList} />
        <Route path="/projection/:projectionId" component={Projection} />
        <Route path="/metadata-field/:fieldName" component={MetadataField} />
        <Route exact path="/notification/" component={NotificationEntityList} />
        <Route exact path="/notification/:entityType/" component={NotificationList} />
        <Route exact path="/notification/:entityType/:notificationId" component={Notification} />
        <Route exact path="/import/settings/" component={ImportSettingsList} />
        <Route exact path="/import/settings/:settingsId" component={ImportSettings} />
        <Route exact path="/import/access/:userName" component={ImportAccess} />
        <Route exact path="/task-group/" component={TaskGroupList} />
        <Route exact path="/task-group/:groupName/" component={TaskGroup} />
        <Route exact path="/quota/" component={Quota} />
        <Route exact path="/storage-group/" component={StorageGroupList} />
        <Route exact path="/storage-group/:groupName/" component={StorageGroup} />
        <Route exact path="/auto-import/" component={AutoImportRuleList} />
        <Route exact path="/auto-import/:storageId/" component={AutoImportRule} />
        <Route exact path="/service/stacktrace/" component={StackTrace} />
        <Route exact path="/transfer/" component={Transfer} />
        <Route exact path="/scheduled-request/" component={ScheduledRequestList} />
        <Route exact path="/stitch/" component={Stitch} />
        <Route exact path="/external-id/:entityType/:entityId" component={ExternalId} />
        <Route exact path="/external-id/:entityType/:entitySubType/:entityId" component={ExternalId} />
      </main>
      <LeftSnackbar />
    </div>
  );
}

export default compose(withErrorBoundary, withModalNoRouter)(Main);
