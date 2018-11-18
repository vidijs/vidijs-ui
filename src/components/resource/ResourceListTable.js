import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ResourceListRow from './ResourceListRow';


const NetworkHeader = () => (
  <React.Fragment>
    <TableCell>Netmask</TableCell>
    <TableCell>Bandswidth</TableCell>
  </React.Fragment>
);

const ExternalTranscoderHeader = () => (
  <React.Fragment>
    <TableCell>Source</TableCell>
    <TableCell>Destination</TableCell>
    <TableCell>Shape Tag</TableCell>
  </React.Fragment>
);

const TranscoderHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
    <TableCell>Version</TableCell>
    <TableCell>Status</TableCell>
  </React.Fragment>
);

const CerifyHeader = () => (
  <React.Fragment>
    <TableCell>Address</TableCell>
  </React.Fragment>
);

const FinalCutServerHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
    <TableCell>Tag</TableCell>
    <TableCell>State</TableCell>
  </React.Fragment>
);

const MXFServerHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
    <TableCell>Workspace Url</TableCell>
    <TableCell>User Workspace Url</TableCell>
  </React.Fragment>
);

const SigniantHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
    <TableCell>Tag</TableCell>
  </React.Fragment>
);

const LDAPHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
  </React.Fragment>
);

const CloudConvertHeader = () => (
  <React.Fragment>
    <TableCell>Public Address</TableCell>
    <TableCell>API Host</TableCell>
  </React.Fragment>
);

const VidinetServiceRow = () => (
  <React.Fragment>
    <TableCell>Url</TableCell>
    <TableCell>Name</TableCell>
    <TableCell>Endpoint</TableCell>
    <TableCell>State</TableCell>
  </React.Fragment>
);

const EidrHeader = () => (
  <React.Fragment>
    <TableCell>URL</TableCell>
    <TableCell>Party ID</TableCell>
    <TableCell>User ID</TableCell>
  </React.Fragment>
);

const ThumbnailServiceHeader = () => (
  <React.Fragment>
    <TableCell>Path</TableCell>
  </React.Fragment>
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
        {resourceList.map(resource => (
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
