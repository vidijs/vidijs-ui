import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

// const TranscoderConfigurationType = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const JobLogEntryType = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const JobRequestChoiceType = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const JobInputProgressType = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const ThumbnailInfoType = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const ShapeDeductionResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const DurationResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const XMPResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const HashResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const TransferResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const AAFGeneratorResponse = ({ value = {} }) => (
//   <React.Fragment>
//   </React.Fragment>
// );
//
// const JobStatusType = ({ value = {} }) => (
//   <React.Fragment>
//     <TextGrid
//       title="statusUri"
//       value={value.statusUri}
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="id"
//       value={value.id}
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="isRunning"
//       value={value.isRunning}
//       variant="boolean"
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="isPaused"
//       value={value.isPaused}
//       variant="boolean"
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="walltime"
//       value={value.walltime}
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="exitcode"
//       value={value.exitcode}
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="message"
//       value={value.message}
//       hover
//       hideNoValue
//     />
//     <TypeArray
//       title="log"
//       value={value.log}
//       component={JobLogEntryType}
//       hideNoValue
//     />
//     <TypeSection
//       title="request"
//       value={value.request}
//       component={JobRequestChoiceType}
//       hideNoValue
//     />
//     <TypeArray
//       title="inputProgress"
//       value={value.inputProgress}
//       component={JobInputProgressType}
//       hideNoValue
//     />
//     <TextGrid
//       title="progress"
//       value={value.progress}
//       hover
//       hideNoValue
//     />
//     <TextGrid
//       title="estimatedTimeLeft"
//       value={value.estimatedTimeLeft}
//       hover
//       hideNoValue
//     />
//     <TypeArray
//       title="thumbnail"
//       value={value.thumbnail}
//       component={ThumbnailInfoType}
//       hideNoValue
//     />
//     <TypeArray
//       title="shapeDeductionResponse"
//       value={value.shapeDeductionResponse}
//       component={ShapeDeductionResponse}
//       hideNoValue
//     />
//     <TypeArray
//       title="durationResponse"
//       value={value.durationResponse}
//       component={DurationResponse}
//       hideNoValue
//     />
//     <TypeArray
//       title="xmpResponse"
//       value={value.xmpResponse}
//       component={XMPResponse}
//       hideNoValue
//     />
//     <TypeArray
//       title="hashResponse"
//       value={value.hashResponse}
//       component={HashResponse}
//       hideNoValue
//     />
//     <TypeArray
//       title="transferResponse"
//       value={value.transferResponse}
//       component={TransferResponse}
//       hideNoValue
//     />
//     <TypeArray
//       title="aafGeneratorResponse"
//       value={value.aafGeneratorResponse}
//       component={AAFGeneratorResponse}
//       hideNoValue
//     />
//   </React.Fragment>
// );

const TranscoderType = ({ value = {} }) => (
  <>
    <TextGrid
      title="type"
      value={value.type}
      hover
    />
    <TextGrid
      title="url"
      value={value.url}
      hover
      hideNoValue
    />
    <TextGrid
      title="version"
      value={value.version}
      hover
      hideNoValue
    />
    <TextGrid
      title="reverseAddress"
      value={value.reverseAddress}
      hover
      hideNoValue
    />
    <TextGrid
      title="reverseAddressDetected"
      value={value.reverseAddressDetected}
      hover
      hideNoValue
    />
    <TextGrid
      title="directAccess"
      value={value.directAccess}
      hover
      hideNoValue
      variant="list"
    />
    <TextGrid
      title="state"
      value={value.state}
      hover
      hideNoValue
    />
    {/* <TypeArray
      title="job"
      value={value.job}
      component={JobStatusType}
      hideNoValue
    />
    <TypeSection
      title="configuration"
      value={value.configuration}
      component={TranscoderConfigurationType}
      hideNoValue
    /> */}
    <TypeArray
      title="transcoder"
      value={value.transcoder}
      component={TranscoderType}
      hideNoValue
    />
    <TextGrid
      title="weight"
      value={value.weight}
      hover
      hideNoValue
    />
    <TextGrid
      title="maxJob"
      value={value.maxJob}
      hover
      hideNoValue
    />
  </>
);

const s3CredentialType = ({ value = {} }) => (
  <>
    <TextGrid
      title="s3CredentialType"
      value={value}
      hover
    />
  </>
);

const VXAVSInstanceType = ({ value = {} }) => (
  <>
    <TextGrid
      title="vsClusterAddress"
      value={value.vsClusterAddress}
      hover
      hideNoValue
    />
    <TextGrid
      title="uri"
      value={value.uri}
      hover
      hideNoValue
    />
    <TextGrid
      title="status"
      value={value.status}
      hover
      hideNoValue
    />
    <TextGrid
      title="lastSeen"
      value={value.lastSeen}
      variant="timestamp"
      hover
      hideNoValue
    />
  </>
);

const VXAStorageType = ({ value = {} }) => (
  <>
    <TextGrid
      title="name"
      value={value.name}
      hover
    />
    <TextGrid
      title="id"
      value={value.id}
      hover
    />
    <TextGrid
      title="path"
      value={value.path}
      hover
    />
    <TextGrid
      title="isCollectionStorage"
      value={value.isCollectionStorage}
      hover
      hideNoValue
    />
    <TextGrid
      title="createProxiesStorage"
      value={value.createProxiesStorage}
      hover
      hideNoValue
    />
  </>
);

const VXAType = ({ value = {} }) => (
  <>
    <TextGrid
      title="uuid"
      value={value.uuid}
      hover
    />
    <TextGrid
      title="name"
      value={value.name}
      hover
      hideNoValue
    />
    <TextGrid
      title="uri"
      value={value.uri}
      hover
      hideNoValue
    />
    <TextGrid
      title="lastSeen"
      value={value.lastSeen}
      variant="timestamp"
      hover
      hideNoValue
    />
    <TextGrid
      title="user"
      value={value.user}
      hover
      hideNoValue
    />
    <TextGrid
      title="allStorages"
      value={value.allStorages}
      variant="boolean"
      hideNoValue
      hover
    />
    <TypeArray
      title="storage"
      value={value.storage}
      component={VXAStorageType}
      hideNoValue
    />
    <TextGrid
      title="file"
      value={value.file}
      hover
      variant="list"
      hideNoValue
    />
    <TextGrid
      title="instance"
      value={value.instance}
      hover
      hideNoValue
    />
    <TextGrid
      title="vxaVersion"
      value={value.vxaVersion}
      hover
    />
    <TypeSection
      component={s3CredentialType}
      value={value.s3CredentialType}
      hideNoValue
    />
    <TextGrid
      title="transcoderVersion"
      value={value.transcoderVersion}
      hover
    />
    <TextGrid
      title="port"
      value={value.port}
      hover
      hideNoValue
    />
    <TextGrid
      title="status"
      value={value.status}
      hover
      hideNoValue
    />
    <TextGrid
      title="mode"
      value={value.mode}
      hover
      hideNoValue
    />
    <TextGrid
      title="publicKey"
      value={value.publicKey}
      hover
      variant="code"
      hideNoValue
    />
    <TextGrid
      title="vsClusterAddress"
      value={value.vsClusterAddress}
      hover
      hideNoValue
    />
    <TypeArray
      title="vsInstance"
      value={value.vsInstance}
      component={VXAVSInstanceType}
      hideNoValue
    />
    <TypeArray
      title="transcoder"
      value={value.transcoder}
      component={TranscoderType}
      hideNoValue
    />
  </>
);

export default function VxaDisplay({
  vxaDocument,
}) {
  return (
    <>
      <TypeSection
        component={VXAType}
        value={vxaDocument}
      />
    </>
  );
}
