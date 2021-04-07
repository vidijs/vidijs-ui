import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import * as formActions from '../../formactions/storagerule';
import StorageRuleDisplay from './StorageRuleDisplay';
import { StorageRuleTagForm } from './StorageRuleForm';
import StorageRuleRemove from './StorageRuleRemove';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';

function StorageRuleTagEditor({
  storageRuleDocument,
  tagName,
  openSnackBar,
  onRefresh,
  onOpen,
}) {
  const EDIT_STORAGERULE_TAG_FORM = 'EDIT_STORAGERULE_TAG_FORM';
  const REMOVE_STORAGERULE_DIALOG = 'REMOVE_STORAGERULE_DIALOG';
  const onSubmitSuccess = () => {
    const messageContent = 'Storage Rule Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Storage Rule';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { tagName };
  const displayProps = { storageRuleDocument };
  const initialValues = { storageRuleDocument };
  return (
    <>
      <Editor
        formName={EDIT_STORAGERULE_TAG_FORM}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
        onSubmit={formActions.onUpdateShapeTag}
        formProps={formProps}
        displayProps={displayProps}
        initialValues={initialValues}
        displayComponent={StorageRuleDisplay}
        formComponent={StorageRuleTagForm}
        title="Storage Rule"
        iconList={
          storageRuleDocument
          && (
          <IconButton onClick={() => onOpen({ modalName: REMOVE_STORAGERULE_DIALOG })}>
            <DeleteForever />
          </IconButton>
          )
        }
      />
      <StorageRuleRemove
        dialogName={REMOVE_STORAGERULE_DIALOG}
        onSuccess={onRefresh}
        storageRuleDocument={storageRuleDocument}
      />
    </>

  );
}

export default withUI(StorageRuleTagEditor);
