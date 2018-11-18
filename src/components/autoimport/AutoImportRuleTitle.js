import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function AutoImportRuleTitle({
  storageId,
  ...props
}) {
  return (
    <TitleHeader
      title={storageId}
      parentTitle="Auto Import Rule"
      parentTo="/auto-import/"
      helpTo="/storage/auto-import.html"
      {...props}
    />
  );
}
