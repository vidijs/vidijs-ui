import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const ConnectionPoolType = ({ value = {} }) => (
  <>
    <TextGrid
      title="minSize"
      value={value.minSize}
      hover
    />
    <TextGrid
      title="maxSize"
      value={value.maxSize}
      hover
    />
    <TextGrid
      title="evictionInterval"
      value={value.evictionInterval}
      hover
    />
    <TextGrid
      title="minIdleTime"
      value={value.minIdleTime}
      hover
    />
  </>
);

const FtpPoolConfigurationType = ({ value = {} }) => (
  <>
    <TypeSection
      value={value.pool}
      component={ConnectionPoolType}
      dense
    />
  </>
);

export default function FtpPoolDisplay({
  ftpPoolConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={ftpPoolConfigurationDocument}
        component={FtpPoolConfigurationType}
      />
    </>
  );
}
