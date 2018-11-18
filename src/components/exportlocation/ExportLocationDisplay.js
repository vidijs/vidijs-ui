import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';

const ExportLocationType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="name"
      value={value.name}
      hover
    />
    <TextGrid
      title="uriList"
      value={value.uriList}
      variant="list"
      hover
    />
    <TextGrid
      title="projection"
      value={value.projection}
      hover
    />
    <TextGrid
      title="tag"
      value={value.tag}
      variant="list"
      hover
    />
    <TextGrid
      title="Script"
      value={value.script}
      variant="code"
    />
  </React.Fragment>
);

export default function ExportLocationDisplay({
  exportLocationDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={ExportLocationType}
        value={exportLocationDocument}
      />
    </React.Fragment>
  );
}
