import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const ConnectionPoolType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

const FtpPoolConfigurationType = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      value={value.pool}
      component={ConnectionPoolType}
      dense
    />
  </React.Fragment>
);

export default function FtpPoolDisplay({
  ftpPoolConfigurationDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        value={ftpPoolConfigurationDocument}
        component={FtpPoolConfigurationType}
      />
    </React.Fragment>
  );
}
