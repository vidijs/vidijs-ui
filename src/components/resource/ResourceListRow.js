import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';
import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

const NetworkRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.netmask}</TableCell>
    <TableCell>{resource.bandwidth}</TableCell>
  </React.Fragment>
);

const ExternalTranscoderRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.source}</TableCell>
    <TableCell>{resource.destination}</TableCell>
    <TableCell>{resource.shapeTag}</TableCell>
  </React.Fragment>
);

const TranscoderRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.version}</TableCell>
    <TableCell>
      {resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}
    </TableCell>
  </React.Fragment>
);

const ThumbnailServiceRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.path}</TableCell>
  </React.Fragment>
);


const CerifyRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.address}</TableCell>
  </React.Fragment>
);

const FinalCutServerRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.tag}</TableCell>
    <TableCell>{resource.state}</TableCell>
  </React.Fragment>
);

const MXFServerRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.workspaceUrl}</TableCell>
    <TableCell>{resource.userWorkspaceUrl}</TableCell>
  </React.Fragment>
);

const SigniantRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.tag}</TableCell>
  </React.Fragment>
);

const LDAPRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
  </React.Fragment>
);

const CloudConvertRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.publicAddress}</TableCell>
    <TableCell>{resource.apiHost}</TableCell>
  </React.Fragment>
);

const VidinetServiceRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.name}</TableCell>
    <TableCell>{resource.endpoint}</TableCell>
    <TableCell>{resource.state}</TableCell>
  </React.Fragment>
);

const EidrRow = ({ resource }) => (
  <React.Fragment>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.partyId}</TableCell>
    <TableCell>{resource.userId}</TableCell>
  </React.Fragment>
);


const ResourceRow = ({ resource, resourceType }) => {
  switch (resourceType) {
    case 'network':
      return (
        <NetworkRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'transcoder':
      return (
        <TranscoderRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'externalTranscoder':
      return (
        <ExternalTranscoderRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'cerify':
      return (
        <CerifyRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'thumbnail':
      return (
        <ThumbnailServiceRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'finalcutserver':
      return (
        <FinalCutServerRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'mxfserver':
      return (
        <MXFServerRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'signiant':
      return (
        <SigniantRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'ldap':
      return (
        <LDAPRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'cloudconvert':
      return (
        <CloudConvertRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'vidinet':
      return (
        <VidinetServiceRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'eidr':
      return (
        <EidrRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    default:
      return (
        <TableCell />
      );
  }
};


export default function ResourceListRow({
  resource,
  resourceType,
}) {
  const { id: resourceId } = resource;
  return (
    <TableRowLink hover to={`/resource/${resourceType}/${resourceId}/`}>
      <TableCell>
        <UnstyledLink to={`/resource/${resourceType}/${resourceId}/`}>
          {resourceId}
        </UnstyledLink>
      </TableCell>
      <ResourceRow resource={resource} resourceType={resourceType} />
    </TableRowLink>
  );
}
