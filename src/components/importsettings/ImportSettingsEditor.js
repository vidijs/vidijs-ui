import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';

import ImportSettingsForm from './ImportSettingsForm';
import ImportSettingsDisplay from './ImportSettingsDisplay';
import * as formActions from '../../formactions/importsettings';
import * as actions from '../../actions';

const EDIT_IMPORTSETTINGS_FORM = 'EDIT_IMPORTSETTINGS_FORM';

class ImportSettingsEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      isEditing: false,
    };
  }

  toggleEdit() {
    const { isEditing: currentIsEditing } = this.state;
    this.setState({ isEditing: !currentIsEditing });
  }

  render() {
    const {
      importSettingsDocument,
      submitForm,
      settingsId,
      onRefresh,
      openSnackBar,
    } = this.props;
    const {
      isEditing,
    } = this.state;
    const initialValues = {
      importSettingsDocument,
    };
    const onSubmitSuccess = () => {
      this.toggleEdit();
      const messageContent = 'Import Settings Saved';
      openSnackBar({ messageContent });
      if (onRefresh) { onRefresh(); }
    };
    const onSubmitFail = () => {
      const messageContent = 'Error Updating Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    };
    return (
      <>
        <CardHeader
          action={(
            <Grid container direction="row-reverse" alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Edit"
                  checked={isEditing}
                  onChange={this.toggleEdit}
                />
              </Grid>
            </Grid>
          )}
        />
        <CardContent>
          {isEditing
            ? (
              <ImportSettingsForm
                form={EDIT_IMPORTSETTINGS_FORM}
                initialValues={initialValues}
                onSubmit={formActions.onUpdate}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                settingsId={settingsId}
              />
            )
            : (
              <ImportSettingsDisplay
                importSettingsDocument={importSettingsDocument}
              />
            )}
        </CardContent>
        {isEditing
          && (
          <>
            <Divider />
            <AccordionActions>
              <Button
                size="small"
                onClick={this.toggleEdit}
              >
                Cancel
              </Button>
              <Button
                onClick={() => submitForm(EDIT_IMPORTSETTINGS_FORM)}
                size="small"
                color="primary"
              >
                Save
              </Button>
            </AccordionActions>
          </>
          )}
      </>
    );
  }
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(ImportSettingsEditor);
