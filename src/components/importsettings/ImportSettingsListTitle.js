import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ImportSettingsListTitle({
  openCode,
  openCreate,
  onRefresh,
}) {
  return (
    <TitleHeader
      title="Import Settings"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
