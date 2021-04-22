import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function DeletionLockTitle({
  lockId,
  ...props
}) {
  return (
    <TitleHeader
      helpTo="/ref/deletion-lock.html"
      title={lockId}
      parentTitle="Deletion Lock"
      parentTo="/deletion-lock/"
      {...props}
    />
  );
}
