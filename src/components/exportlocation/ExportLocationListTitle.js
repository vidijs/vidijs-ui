import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ExportLocationListTitle(props) {
  return (
    <TitleHeader
      title="Export Location"
      helpTo="/ref/export-location.html"
      {...props}
    />
  );
}
