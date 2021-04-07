import React from 'react';
import startCase from 'lodash.startcase';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TitleHeader from '../ui/TitleHeader';

export default function ResourceTitle({
  resourceType,
  resourceId,
  openCode,
  onRefresh,
  openRemove,
}) {
  return (
    <TitleHeader
      grandParentTitle="Resource"
      grandParentTo="/resource/"
      parentTitle={startCase(resourceType)}
      parentTo={`/resource/${resourceType}/`}
      title={resourceId}
      onRefresh={onRefresh}
      openCode={openCode}
      actionComponent={(
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      )}
    />
  );
}
