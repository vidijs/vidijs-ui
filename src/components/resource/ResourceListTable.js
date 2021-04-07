import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ResourceListRow from './ResourceListRow';

const NetworkHeader = () => (
  <>
    <TableCell>Netmask</TableCell>
    <TableCell>Bandswidth</TableCell>
  </>
);

const ExternalTranscoderHeader = () => (
  <>
    <TableCell>Source</TableCell>
    <TableCell>Destination</TableCell>
    <TableCell>Shape Tag</TableCell>
  </>
);

const TranscoderHeader = () => (
  <>
    <TableCell>URL</TableCell>
    <TableCell>Version</TableCell>
    <TableCell>Status</TableCell>
  </>
);

const CerifyHeader = () => (
  <>
    <TableCell>Address</TableCell>
  </>
);

const FinalCutServerHeader = () => (
  <>
    <TableCell>URL</TableCell>
    <TableCell>Tag</TableCell>
    <TableCell>State</TableCell>
  </>
);

const MXFServerHeader = () => (
  <>
    <TableCell>URL</TableCell>
    <TableCell>Workspace Url</TableCell>
    <TableCell>User Workspace Url</TableCell>
  </>
);

const SigniantHeader = () => (
  <>
    <TableCell>URL</TableCell>
    <TableCell>Tag</TableCell>
  </>
);

const LDAPHeader = () => (
  <>
    <TableCell>URL</TableCell>
  </>
);

const CloudConvertHeader = () => (
  <>
    <TableCell>Public Address</TableCell>
    <TableCell>API Host</TableCell>
  </>
);

const VidinetServiceRow = () => (
  <>
    <TableCell>Url</TableCell>
    <TableCell>Name</TableCell>
    <TableCell>Endpoint</TableCell>
    <TableCell>State</TableCell>
  </>
);

const EidrHeader = () => (
  <>
    <TableCell>URL</TableCell>
    <TableCell>Party ID</TableCell>
    <TableCell>User ID</TableCell>
  </>
);

const ThumbnailServiceHeader = () => (
  <>
    <TableCell>Path</TableCell>
  </>
);

const ResourceHeader = ({ resourceType }) => {
  switch (resourceType) {
    case 'network':
      return (
        <NetworkHeader />
      );
    case 'transcoder':
      return (
        <TranscoderHeader />
      );
    case 'externalTranscoder':
      return (
        <ExternalTranscoderHeader />
      );
    case 'cerify':
      return (
        <CerifyHeader />
      );
    case 'thumbnail':
      return (
        <ThumbnailServiceHeader />
      );
    case 'finalcutserver':
      return (
        <FinalCutServerHeader />
      );
    case 'mxfserver':
      return (
        <MXFServerHeader />
      );
    case 'signiant':
      return (
        <SigniantHeader />
      );
    case 'ldap':
      return (
        <LDAPHeader />
      );
    case 'cloudconvert':
      return (
        <CloudConvertHeader />
      );
    case 'vidinet':
      return (
        <VidinetServiceRow />
      );
    case 'eidr':
      return (
        <EidrHeader />
      );
    default:
      return (
        <TableCell />
      );
  }
};

export default function NotificationListTable({
  resourceListDocument = {},
  resourceType,
}) {
  const { resource: resourceList = [] } = resourceListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <ResourceHeader resourceType={resourceType} />
        </TableRow>
      </TableHead>
      <TableBody>
        {resourceList.map((resource) => (
          <ResourceListRow
            key={resource.id}
            resource={resource}
            resourceType={resourceType}
          />
        ))}
      </TableBody>
    </Table>
  );
}
