import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const LogReportConfigurationType = ({ value = {} }) => (
  <>
    <TextGrid
      title="path"
      value={value.path}
      hover
    />
    <TextGrid
      title="expiryTime"
      value={value.expiryTime}
      hover
    />
    <TextGrid
      title="uploadUri"
      value={value.uploadUri}
      hover
    />
    <TextGrid
      title="certificate"
      value={value.certificate}
      hover
    />
    <TextGrid
      title="clientKey"
      value={value.clientKey}
      hover
    />
    <TextGrid
      title="clientCertificate"
      value={value.clientCertificate}
      hover
    />
  </>
);

export default function LogReportDisplay({
  logReportConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={logReportConfigurationDocument}
        component={LogReportConfigurationType}
      />
    </>
  );
}
