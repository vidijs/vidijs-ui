import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TitleHeader from '../ui/TitleHeader';

export default function ImportSettingsTitle({
  openCode,
  onRefresh,
  settingsId,
  openRemove,
}) {
  return (
    <TitleHeader
      title={settingsId}
      parentTitle="Import Settings"
      parentTo="/import/settings/"
      openCode={openCode}
      onRefresh={onRefresh}
      actionComponent={(
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      )}
    />
  );
}
