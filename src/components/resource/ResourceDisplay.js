import React from 'react';

import TextGrid from '../ui/TextGrid';

const SimpleMetadataType = ({ metadata }) => (
  <>
    <TextGrid title="Metadata" value="" />
    {metadata.field
      && metadata.field.map((field) => (
        <TextGrid key={field.key} title={field.key} value={field.value} />
      ))}
  </>
);

const ThumbnailServiceType = ({ thumbnail }) => (
  <>
    <TextGrid title="Path" value={thumbnail.path} />
    <TextGrid title="Mode" value={thumbnail.mode} />
  </>
);

const NetworkType = ({ network }) => (
  <>
    <TextGrid title="Netmask" value={network.netmask} />
    <TextGrid title="Bandwidth" value={network.bandwidth} />
  </>
);

const FinalCutServerType = ({ finalcutserver }) => (
  <>
    <TextGrid title="URL" value={finalcutserver.url} />
    <TextGrid title="Tag" value={finalcutserver.tag} />
    <TextGrid title="State" value={finalcutserver.state} />
    <TextGrid title="Description" value={finalcutserver.description} />
    <SimpleMetadataType metadata={finalcutserver.metadata} />
  </>
);

const CerifyType = ({ cerify }) => (
  <>
    <TextGrid title="Address" value={cerify.address} />
    <TextGrid title="Cleanup" value={cerify.cleanup} />
    {cerify.mediaLocation
      && cerify.mediaLocation.map((mediaLocation, index) => (
        <React.Fragment
          key={index} // eslint-disable-line react/no-array-index-key
        >
          <TextGrid title="Media Location Name" value={mediaLocation.name} />
          <TextGrid title="Media Location Storage Method" variant="list" value={mediaLocation.storageMethod} />
        </React.Fragment>
      ))}
  </>
);

const TranscoderDirectAccess = ({ directAccess }) => (
  <>
    <TextGrid title="Filter" value={directAccess.filter} />
    {/* <TextGrid title="Rewrite" value={directAccess.rewrite} />
    <TextGrid title="Pattern" value={directAccess.pattern} />
    <TextGrid title="Replacement" value={directAccess.replacement} /> */}
  </>
);

const ExternalTranscoderType = ({ externalTranscoder }) => (
  <>
    <TextGrid title="Source" value={externalTranscoder.source} />
    <TextGrid title="Destination" value={externalTranscoder.destination} />
    <TextGrid title="Shape Tag" value={externalTranscoder.shapeTag} />
    <TextGrid title="Timeout" value={externalTranscoder.timeout} />
    <TextGrid title="Interval" value={externalTranscoder.interval} />
    <TextGrid title="Checks" value={externalTranscoder.checks} />
    <TextGrid title="Regex" value={externalTranscoder.regex} />
  </>
);

const TranscoderType = ({ transcoder }) => (
  <>
    <TextGrid title="Type" value={transcoder.type} />
    <TextGrid title="URL" value={transcoder.url} />
    <TextGrid title="Version" value={transcoder.version} />
    <TextGrid title="Reverse Address" value={transcoder.reverseAddress} />
    <TextGrid title="Reverse Address Detected" value={transcoder.reverseAddressDetected} />
    <TextGrid title="Direct Access" />
    { transcoder.directAccess
      && transcoder.directAccess.map((directAccess, index) => (
        <TranscoderDirectAccess
          directAccess={directAccess}
          key={index} // eslint-disable-line react/no-array-index-key
        />
      ))}
    <TextGrid title="State" value={transcoder.state} />
    {/* <TextGrid title="Job" value={transcoder.job} /> */}
    {/* <TextGrid title="Configuration" value={transcoder.configuration} /> */}
    {/* <TextGrid title="Transcoder" value={transcoder.transcoder} /> */}
    <TextGrid title="Weight" value={transcoder.weight} />
    <TextGrid title="Max Job" value={transcoder.maxJob} />
  </>
);

const MXFServerResourceType = ({ mxfserver }) => (
  <>
    <TextGrid title="URL" value={mxfserver.url} />
    <TextGrid title="Workspace Url" value={mxfserver.workspaceUrl} />
    <TextGrid title="User Workspace Url" value={mxfserver.userWorkspaceUrl} />
    <TextGrid title="MXFServer Workspace Path" value={mxfserver.mxfServerWorkspacePath} />
    <TextGrid title="MXFServer User Id" value={mxfserver.mxfServerUserId} />
    <TextGrid title="MXFServer Path To Storage" value={mxfserver.mxfServerPathToStorage} />
    <TextGrid title="Database Name" value={mxfserver.databaseName} />
    <TextGrid title="Storage ID" value={mxfserver.storageId} />
    <TextGrid title="Description" value={mxfserver.description} />
    <TextGrid title="Atom Shapes" value={mxfserver.atomShapes} />
    <TextGrid title="Import Shapes" value={mxfserver.importShapes} />
    <TextGrid title="Detect Atom" variant="boolean" value={mxfserver.detectAtom} />
    <TextGrid title="Enforce Quota" variant="boolean" value={mxfserver.enforceQuota} />
    <TextGrid title="File Import Pattern" value={mxfserver.fileImportPattern} />
    <SimpleMetadataType metadata={mxfserver.metadata} />
  </>
);

const SigniantType = ({ signiant }) => (
  <>
    <TextGrid title="URL" value={signiant.url} />
    <TextGrid title="Tag" value={signiant.tag} />
    <TextGrid title="Username" value={signiant.username} />
    <TextGrid title="Password" value={signiant.password} />
    <TextGrid title="Description" value={signiant.description} />
  </>
);

const LDAPResourceType = ({ ldap }) => (
  <>
    <TextGrid title="url" variant="list" value={ldap.url} />
    <TextGrid title="Use StartTLS" value={ldap.useStartTLS} />
    <TextGrid title="User DN" value={ldap.userDN} />
    <TextGrid title="Username Attribute" value={ldap.usernameAttribute} />
    <TextGrid title="User Search Filter" value={ldap.userSearchFilter} />
    <TextGrid title="Bind DN" value={ldap.bindDN} />
    <TextGrid title="Bind Password" value={ldap.bindPassword} />
    <TextGrid title="Cache Lifetime" value={ldap.cacheLifetime} />
    <TextGrid title="Group DN" value={ldap.groupDN} />
    <TextGrid title="Group Search Filter" value={ldap.groupSearchFilter} />
    <TextGrid title="Real Name Attribute" value={ldap.realNameAttribute} />
    <TextGrid title="Groupname Attribute" value={ldap.groupnameAttribute} />
    <TextGrid title="Username Format" value={ldap.usernameFormat} />
    { ldap.sync
      && (
      <>
        <TextGrid title="Create Users" variant="boolean" value={ldap.sync.createUsers} />
        <TextGrid title="Create Groups" variant="boolean" value={ldap.sync.createGroups} />
      </>
      )}
  </>
);

const CloudConvertType = ({ cloudconvert }) => (
  <>
    <TextGrid title="Public Address" value={cloudconvert.publicAddress} />
    <TextGrid title="API Host" value={cloudconvert.apiHost} />
    <TextGrid title="API Key" value={cloudconvert.apiKey} />
    <TextGrid title="Input Method" value={cloudconvert.inputMethod} />
    <TextGrid title="Script" value={cloudconvert.script} />
  </>
);

const VidinetServiceType = ({ vidinet }) => (
  <>
    <TextGrid title="URL" value={vidinet.url} />
    <TextGrid title="Name" value={vidinet.name} />
    <TextGrid title="Endpoint" value={vidinet.endpoint} />
    <TextGrid title="State" value={vidinet.state} />
    <TextGrid title="Scheme" variant="list" value={vidinet.scheme} />
  </>
);

const EidrType = ({ eidr }) => (
  <>
    <TextGrid title="URL" value={eidr.url} />
    <TextGrid title="Include" variant="list" value={eidr.include} />
    <TextGrid title="Party ID" value={eidr.partyId} />
    <TextGrid title="User ID" value={eidr.userId} />
    <TextGrid title="Password" value={eidr.password} />
  </>
);

const ResourceType = ({ resourceType, resourceDocument }) => {
  switch (resourceType) {
    case 'network':
      return (
        <NetworkType network={resourceDocument.network} />
      );
    case 'transcoder':
      return (
        <TranscoderType transcoder={resourceDocument.transcoder} />
      );
    case 'externalTranscoder':
      return (
        <ExternalTranscoderType externalTranscoder={resourceDocument.externalTranscoder} />
      );
    case 'cerify':
      return (
        <CerifyType cerify={resourceDocument.cerify} />
      );
    case 'thumbnail':
      return (
        <ThumbnailServiceType thumbnail={resourceDocument.thumbnail} />
      );
    case 'finalcutserver':
      return (
        <FinalCutServerType finalcutserver={resourceDocument.finalcutserver} />
      );
    case 'mxfserver':
      return (
        <MXFServerResourceType mxfserver={resourceDocument.mxfserver} />
      );
    case 'signiant':
      return (
        <SigniantType signiant={resourceDocument.signiant} />
      );
    case 'ldap':
      return (
        <LDAPResourceType ldap={resourceDocument.ldap} />
      );
    case 'cloudconvert':
      return (
        <CloudConvertType cloudconvert={resourceDocument.cloudconvert} />
      );
    case 'vidinet':
      return (
        <VidinetServiceType vidinet={resourceDocument.vidinet} />
      );
    case 'eidr':
      return (
        <EidrType eidr={resourceDocument.eidr} />
      );
    default:
      return null;
  }
};

export default function ResourceDisplay({ resourceType, resourceDocument }) {
  return (
    <>
      <TextGrid title="ID" value={resourceDocument.id} />
      <ResourceType resourceType={resourceType} resourceDocument={resourceDocument} />
    </>
  );
}
