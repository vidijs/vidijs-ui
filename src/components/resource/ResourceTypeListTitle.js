import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ResourceTypeListTitle({
  onRefresh,
  openCode,
}) {
  return (
    <TitleHeader
      title="Resource"
      onRefresh={onRefresh}
      openCode={openCode}
    />
  );
}
