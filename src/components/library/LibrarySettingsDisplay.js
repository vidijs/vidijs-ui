import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import { ItemSearchType } from '../item/ItemSearchDisplay';

const LibrarySettingsType = ({ value }) => (
  <React.Fragment>
    <TextGrid
      title="Library ID"
      value={value.id}
      hover
    />
    <TextGrid
      title="username"
      value={value.username}
      hover
    />
    <TextGrid
      title="updateMode"
      value={value.updateMode}
      hover
    />
    <TextGrid
      title="autoRefresh"
      value={value.autoRefresh}
      variant="boolean"
      hover
    />
    <TextGrid
      title="updateFrequency"
      value={value.updateFrequency}
      hover
    />
    <TextGrid
      title="lastUpdate"
      value={value.lastUpdate}
      hover
    />
    <TypeSection
      value={value.query}
      title="Query"
      component={ItemSearchType}
    />
  </React.Fragment>
);

export default function LibrarySettingsDisplay({
  librarySettingsDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        value={librarySettingsDocument}
        component={LibrarySettingsType}
      />
    </React.Fragment>
  );
}
