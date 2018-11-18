import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function StorageListTitle({
  openCode,
  openCreate,
  onRefresh,
}) {
  return (
    <TitleHeader
      title="Storage"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
      helpTo="/ref/storage/storage.html"
    />
  );
}
