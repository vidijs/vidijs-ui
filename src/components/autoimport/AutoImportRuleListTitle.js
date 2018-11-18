import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function AutoImportRuleListTitle({
  ...props
}) {
  return (
    <TitleHeader
      title="Auto Import Rule"
      helpTo="/storage/auto-import.html"
      {...props}
    />
  );
}
