import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';
import { OK_STATES } from '../../const/StorageStates';
import StorageStatus from './StorageStatus';

const EvacuateMenuItem = ({
  storageDocument,
  evacuateModal,
  evacuateCancelModal,
  onOpen,
}) => {
  if (storageDocument === undefined) { return null; }
  const { state } = storageDocument;
  if (OK_STATES.includes(state)) {
    return (
      <MenuItem onClick={() => onOpen({ modalName: evacuateModal })}>
        <Typography color="secondary">Evacuate Storage</Typography>
      </MenuItem>
    );
  }
  if (state === 'EVACUATING') {
    return (
      <MenuItem onClick={() => onOpen({ modalName: evacuateCancelModal })}>
        <Typography color="secondary">Cancel Evacuate Storage</Typography>
      </MenuItem>
    );
  }
  return null;
};

function StorageTitle({
  onOpen,
  storageId,
  typeModal,
  onRescan,
  evacuateModal,
  evacuateCancelModal,
  removeModal,
  code,
  ...props
}) {
  return (
    <TitleHeader
      title={storageId}
      parentTitle="Storage"
      parentTo="/storage/"
      helpTo="/ref/storage/storage.html"
      entityId={storageId}
      entityType="storage"
      code={code}
      iconList={(
        <>
          <StorageStatus storageDocument={code} />
          <Menu>
            <MenuItem onClick={() => onOpen({ modalName: typeModal })}>
              <Typography color="inherit">Change Storage Type</Typography>
            </MenuItem>
            <MenuItem onClick={onRescan}>
              <Typography color="inherit">Rescan</Typography>
            </MenuItem>
            <EvacuateMenuItem
              storageDocument={code}
              evacuateModal={evacuateModal}
              evacuateCancelModal={evacuateCancelModal}
              onOpen={onOpen}
            />
            <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
              <Typography color="secondary">Delete Storage</Typography>
            </MenuItem>
          </Menu>
        </>

      )}
      {...props}
    />
  );
}

export default withModalNoRouter(StorageTitle);
