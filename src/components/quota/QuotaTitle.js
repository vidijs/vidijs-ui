import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function QuotaTitle({
  openCode,
  openCreate,
  onRefresh,
}) {
  return (
    <TitleHeader
      title="Quota"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
