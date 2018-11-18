import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function StorageRuleListTitle(props) {
  return (
    <TitleHeader
      title="Storage Rule"
      helpTo="/ref/storage/storage-rule.html"
      {...props}
    />
  );
}
