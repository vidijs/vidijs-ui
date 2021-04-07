import React from 'react';
import { connect } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';

import StorageGroupStorageDisplay from './StorageGroupStorageDisplay';
import StorageGroupStorageRemove from './StorageGroupStorageRemove';
import * as actions from '../../actions';

const STORAGEGROUP_STORAGE_REMOVE_MODAL = 'STORAGEGROUP_STORAGE_REMOVE_MODAL';

function StorageGroupStorageEditor({
  storageDocument,
  openModal,
  modalName,
  openSnackBar,
  closeModal,
  groupName,
  onRefresh,
  storageId,
  history,
}) {
  return (
    <>
      <CardHeader
        subheader={storageDocument.id}
        action={(
          <IconButton
            onClick={() => openModal({ modalName: STORAGEGROUP_STORAGE_REMOVE_MODAL })}
          >
            <Delete />
          </IconButton>
        )}
      />
      <CardContent onClick={() => history.push(`/storage/${storageId}`)}>
        <StorageGroupStorageDisplay
          storageDocument={storageDocument}
        />
      </CardContent>
      <StorageGroupStorageRemove
        isOpen={(modalName === STORAGEGROUP_STORAGE_REMOVE_MODAL)}
        groupName={groupName}
        storageId={storageId}
        openSnackBar={openSnackBar}
        closeModal={closeModal}
        onRefresh={onRefresh}
      />
    </>
  );
}

function mapStateToProps(state) {
  const { ui: { modalName } } = state;
  return {
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StorageGroupStorageEditor));
