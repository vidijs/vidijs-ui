import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';


function LibraryTitle({
  libraryId,
  onOpen,
  removeModal,
  updateModal,
  itemMetadataModal,
  title,
  ...props
}) {
  return (
    <TitleHeader
      grandParentTitle="Library"
      grandParentTo="/library/"
      parentTitle={libraryId}
      title={title}
      helpTo="/ref/library.html"
      entityId={libraryId}
      entityType="library"
      removeModal={removeModal}
      actionComponent={(
        <Menu>
          <MenuItem onClick={() => onOpen({ modalName: updateModal })}>
            <Typography>Add Item</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: itemMetadataModal })}>
            <Typography>Update Item Metadata</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
            <Typography color="secondary">Delete</Typography>
          </MenuItem>
        </Menu>
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(LibraryTitle);
