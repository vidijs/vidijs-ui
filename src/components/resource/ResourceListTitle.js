import React from 'react';
import startCase from 'lodash.startcase';

import TitleHeader from '../ui/TitleHeader';

export default function ResourceListTitle({
  resourceType,
  openCode,
  openCreate,
  onRefresh,
}) {
  return (
    <TitleHeader
      parentTitle="Resource"
      parentTo="/resource/"
      title={startCase(resourceType)}
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
