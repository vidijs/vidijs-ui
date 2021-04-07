import React from 'react';
import { compose } from 'redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../../formactions/configuration';
import PropertiesForm from './PropertiesForm';
import PropertiesJavascriptForm from './PropertiesJavascriptForm';
import withUI from '../../../hoc/withUI';
import withFormActions from '../../../hoc/withFormActions';
import withTabs from '../../../hoc/withTabs';
import DialogContent from '../../ui/DialogContent';

const CONFIGURATIONPROPERTIES_FORM = 'CONFIGURATIONPROPERTIES_FORM';
const TEXT_TAB = 'TEXT_TAB';
const JAVASCRIPT_TAB = 'JAVASCRIPT_TAB';

function PropertiesDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  configurationPropertyDocument,
  tabValue,
  onChangeTab,
}) {
  const onSubmitSuccess = (response) => {
    const { configurationPropertyDocument: { key } } = response;
    const messageContent = `Configuration Property ${key} Updated`;
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Configuration Property';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  let isJavascript = false;
  if (configurationPropertyDocument && configurationPropertyDocument.key) {
    if (configurationPropertyDocument.key.startsWith('javascript-')) {
      isJavascript = true;
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Edit Configuration Property</DialogTitle>
      <DialogContent>
        { isJavascript === false
        && (
        <Tabs
          value={tabValue}
          onChange={onChangeTab}
        >
          <Tab label="Text" value={TEXT_TAB} />
          <Tab label="Javascript" value={JAVASCRIPT_TAB} />
        </Tabs>
        )}
        { (!isJavascript && tabValue === TEXT_TAB)
        && (
        <PropertiesForm
          form={CONFIGURATIONPROPERTIES_FORM}
          onSubmit={formActions.onUpdatePropertiesConfiguration}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ configurationPropertyDocument }}
          destroyOnUnmount={false}
          enableReinitialize
        />
        )}
        { (isJavascript || tabValue === JAVASCRIPT_TAB)
        && (
        <PropertiesJavascriptForm
          form={CONFIGURATIONPROPERTIES_FORM}
          onSubmit={formActions.onUpdatePropertiesConfiguration}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={
            configurationPropertyDocument
              ? { configurationPropertyDocument }
              : { configurationPropertyDocument: { key: 'javascript-' } }
}
          destroyOnUnmount={false}
          enableReinitialize
        />
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(CONFIGURATIONPROPERTIES_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions, withTabs(TEXT_TAB))(PropertiesDialog);
