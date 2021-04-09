import React from 'react';
import { useHistory } from 'react-router-dom';
import { WrappedSelect } from './Select';

const itemParams = new URLSearchParams({
  content: 'metadata,thumbnail',
  terse: true,
  'noauth-url': true,
});

const linkOptions = [
  { value: '/new-job/', label: 'New Job' },
  { value: '/job', label: 'Job List' },
  { value: '/jobtype/', label: 'Job Types' },
  { value: '/search/', label: 'Search Items & Collections' },
  { value: `/item/?${itemParams.toString()}`, label: 'Search Items' },
  { value: '/collection/', label: 'Search Collections' },
  { value: '/shape/', label: 'Search Shapes' },
  { value: '/search/field-group/', label: 'Search Field Groups' },
  { value: '/library/', label: 'Search Libraries' },
  { value: '/storage/', label: 'Storages' },
  { value: '/file/', label: 'Files' },
  { value: '/storage-rule/', label: 'Storage Rules' },
  { value: '/import/?tab=IMPORTPLACEHOLDER_TAB', label: 'Create Item' },
  { value: '/import/?tab=IMPORTCOLLECTION_TAB', label: 'Create Collection' },
  { value: '/import/?tab=IMPORTSHAPEPLACEHOLDER_TAB', label: 'Create Shape' },
  { value: '/import/?tab=IMPORTFILE_TAB', label: 'Import File' },
  { value: '/import/?tab=IMPORTRAW_TAB', label: 'Upload' },
  { value: '/import/?tab=IMPORTURI_TAB', label: 'Import URIs' },
  { value: '/import/?tab=IMPORTSHAPE_TAB', label: 'Import Shape' },
  { value: '/import/?tab=IMPORTCOMPONENT_TAB', label: 'Import Component' },
  { value: '/import-imp/?tab=IMPORTIMP_URL_TAB', label: 'Import IMP URL' },
  { value: '/import-imp/?tab=IMPORTIMP_PATH_TAB', label: 'Import IMP Path' },
  { value: '/import-imp/?tab=IMPORTIMP_FILE_TAB', label: 'Import IMP File' },
  { value: '/vxa/', label: 'VSA Server Agents' },
  { value: '/resource/transcoder/', label: 'Transcoders' },
  { value: '/resource/thumbnail/', label: 'Thumbnail Paths' },
  { value: '/resource/vidinet/', label: 'Vidinet' },
  { value: '/export-location', label: 'Export Locations' },
  { value: '/user/', label: 'Users' },
  { value: '/group/', label: 'Groups' },
  { value: '/metadata-field/', label: 'Metadata Fields' },
  { value: '/field-group/', label: 'Metadata Field Groups' },
  { value: '/debug/echo/', label: 'XML Echo' },
  { value: '/javascript/test/', label: 'Javascript Test' },
  { value: '/wizard/', label: 'Wizard' },
  { value: '/shape-tag/', label: 'Shape Tags' },
  { value: '/version/', label: 'Version' },
  { value: '/selftest/', label: 'Self Test' },
  { value: '/log', label: 'Audit Log' },
  { value: '/error/', label: 'Error Log' },
  { value: '/reindex/', label: 'Re-Index' },
  { value: '/service/', label: 'Services' },
  { value: '/configuration/properties/', label: 'Configuration Properties' },
  { value: '/configuration/job-pool/', label: 'Job Pools' },
  { value: '/configuration/path-alias/', label: 'Path Alias' },
  { value: '/external-id/', label: 'External Identifiers' },
  { value: '/document/', label: 'Document' },
  { value: '/conform/', label: 'Conform' },
  { value: '/projection/', label: 'Projection' },
  { value: '/notification/', label: 'Notification' },
  { value: '/notification/item/', label: 'Item Notification' },
  { value: '/notification/collection/', label: 'Collection Notification' },
  { value: '/notification/job/', label: 'Job Notification' },
  { value: '/notification/storage/', label: 'Storage Notification' },
  { value: '/notification/file/', label: 'File Notification' },
  { value: '/notification/quota/', label: 'Quota Notification' },
  { value: '/notification/group/', label: 'Group Notification' },
  { value: '/notification/document/', label: 'Document Notification' },
  { value: '/import/settings/', label: 'Import Settings' },
  { value: '/task-group/', label: 'Task Groups' },
  { value: '/quota/', label: 'Quota' },
  { value: '/storage-group/', label: 'Storage Groups' },
  { value: '/auto-import/', label: 'Auto Import Rules' },
  { value: '/service/stacktrace/', label: 'Stack Trace' },
  { value: '/transfer/', label: 'Import Transfers' },
  { value: '/configuration/', label: 'Configuration' },
  { value: '/configuration/ftp-pool/', label: 'FTP Pool' },
  { value: '/scheduled-request/', label: 'Scheduled Requests' },
  { value: '/stitch/', label: 'Stitch' },
  { value: '/deletion-lock/', label: 'Deletion Locks' },
];

export default function NavSelect({ onChange, ...props }) {
  const history = useHistory();

  return (
    <WrappedSelect
      value=""
      options={linkOptions}
      label="Search for endpoint..."
      onChange={(e) => {
        if (onChange) onChange(e);
        history.push(e.value);
      }}
      {...props}
    />
  );
}
