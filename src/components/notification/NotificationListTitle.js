import React from 'react';

import TitleHeader from '../ui/TitleHeader';
import capitalizeString from '../../utils/capitalizeString';

export default function NotificationListTitle({
  entityType,
  openCode,
  openCreate,
  onRefresh,
}) {
  return (
    <TitleHeader
      title={`Notification ${capitalizeString(entityType)}`}
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
