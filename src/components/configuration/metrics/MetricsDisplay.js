import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';
import TextGridArray from '../../ui/TextGridArray';

const StatsdReporterType = ({ value = {} }) => (
  <>
    <TextGrid
      title="host"
      value={value.host}
      hover
    />
    <TextGrid
      title="port"
      value={value.port}
      hover
    />
    <TextGrid
      title="prefix"
      value={value.prefix}
      hover
    />
    <TextGrid
      title="tags"
      value={value.tags}
      variant="boolean"
      hover
    />
    <TextGridArray
      value={value.exclude}
      title="Exclude Filter"
      hover
    />
    <TextGridArray
      value={value.include}
      title="Include Filter"
      hover
    />
  </>
);

const MetricsConfigurationType = ({ value = {} }) => (
  <>
    <TypeSection
      value={value.statsd}
      component={StatsdReporterType}
      dense
    />
  </>
);

export default function MetricsDisplay({
  metricsConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={metricsConfigurationDocument}
        component={MetricsConfigurationType}
      />
    </>
  );
}
