import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ExportLocationTitle(props) {
  return (
    <TitleHeader
      parentTitle="Export Location"
      parentTo="/export-location/"
      title={props.locationName}
      helpTo="/ref/export-location.html"
      {...props}
    />
  );
}
