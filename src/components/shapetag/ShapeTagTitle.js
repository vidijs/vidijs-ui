import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TitleHeader from '../ui/TitleHeader';

export default function ShapeTagTitle({
  openCode,
  onRefresh,
  tagName,
  openRemove,
}) {
  return (
    <TitleHeader
      title={tagName}
      parentTitle="Shape Tag"
      parentTo="/shape-tag/"
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
