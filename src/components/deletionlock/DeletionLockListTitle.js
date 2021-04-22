import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function DeletionLockListTitle(props) {
  return (
    <TitleHeader
      title="Deletion Lock"
      helpTo="/ref/deletion-lock.html"
      {...props}
    />
  );
}
