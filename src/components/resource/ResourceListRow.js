import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';
import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

const NetworkRow = ({ resource }) => (
  <>
    <TableCell>{resource.netmask}</TableCell>
    <TableCell>{resource.bandwidth}</TableCell>
  </>
);

const ExternalTranscoderRow = ({ resource }) => (
  <>
    <TableCell>{resource.source}</TableCell>
    <TableCell>{resource.destination}</TableCell>
    <TableCell>{resource.shapeTag}</TableCell>
  </>
);

const TranscoderRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.version}</TableCell>
    <TableCell>
      {resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}
    </TableCell>
  </>
);

const ThumbnailServiceRow = ({ resource }) => (
  <>
    <TableCell>{resource.path}</TableCell>
  </>
);

const CerifyRow = ({ resource }) => (
  <>
    <TableCell>{resource.address}</TableCell>
  </>
);

const FinalCutServerRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.tag}</TableCell>
    <TableCell>{resource.state}</TableCell>
  </>
);

const MXFServerRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.workspaceUrl}</TableCell>
    <TableCell>{resource.userWorkspaceUrl}</TableCell>
  </>
);

const SigniantRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.tag}</TableCell>
  </>
);

const LDAPRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
  </>
);

const CloudConvertRow = ({ resource }) => (
  <>
    <TableCell>{resource.publicAddress}</TableCell>
    <TableCell>{resource.apiHost}</TableCell>
  </>
);

const VidinetServiceRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.name}</TableCell>
    <TableCell>{resource.endpoint}</TableCell>
    <TableCell>{resource.state}</TableCell>
  </>
);

const EidrRow = ({ resource }) => (
  <>
    <TableCell>{resource.url}</TableCell>
    <TableCell>{resource.partyId}</TableCell>
    <TableCell>{resource.userId}</TableCell>
  </>
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
