import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';

export default function StorageGroupTitle({
  groupName,
  openCode,
  onRefresh,
  openRemove,
  openAddStorage,
}) {
  return (
    <TitleHeader
      parentTitle="Storage Group"
      parentTo="/storage-group/"
      title={groupName}
      onRefresh={onRefresh}
      openCode={openCode}
      actionComponent={(
        <Menu>
          <MenuItem onClick={openAddStorage}>
            <Typography>Add Storage</Typography>
          </MenuItem>
          <MenuItem onClick={openRemove}>
            <Typography color="error">Remove Storage Group</Typography>
          </MenuItem>
        </Menu>
      )}
    />
  );
}
