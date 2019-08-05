import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import SimpleMetadataForm from './SimpleMetadataForm';
import SimpleMetadataDisplay from './SimpleMetadataDisplay';
import * as formActions from '../../formactions/metadata';

const EDIT_SIMPLE_METADATA_FORM = 'EDIT_SIMPLE_METADATA_FORM';

class SimpleMetadataEditor extends React.PureComponent {
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
      simpleMetadataDocument,
      submitForm,
      entityType,
      entityId,
      onSuccess,
    } = this.props;
    const {
      isEditing,
    } = this.state;
    let { simpleMetadataList } = this.props;
    let initialValues = {
      simpleMetadataDocument: {
        field: simpleMetadataList,
      },
    };
    if (simpleMetadataDocument) {
      initialValues = { simpleMetadataDocument };
      simpleMetadataList = simpleMetadataDocument.field || [];
    }
    const onSubmitSuccess = (response, dispatch, props) => {
      formActions.onUpdateSimpleMetadataSubmitSuccess(response, dispatch, props);
      this.toggleEdit();
      if (onSuccess) { onSuccess(response, dispatch, props); }
    };
    return (
      <React.Fragment>
        <CardHeader
          title={<Typography variant="subtitle1">Metadata</Typography>}
          disableTypography
          action={
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
          }
        />
        <CardContent>
          {isEditing ?
            <SimpleMetadataForm
              form={EDIT_SIMPLE_METADATA_FORM}
              initialValues={initialValues}
              onSubmit={formActions.onUpdateSimpleMetadataSubmit}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={formActions.onUpdateSimpleMetadataSubmitFail}
              entityType={entityType}
              entityId={entityId}
            />
          :
            <SimpleMetadataDisplay simpleMetadataList={simpleMetadataList} />
          }
        </CardContent>
        {isEditing &&
          <React.Fragment>
            <Divider />
            <ExpansionPanelActions>
              <Button
                size="small"
                onClick={this.toggleEdit}
              >
                Cancel
              </Button>
              <Button
                onClick={() => submitForm(EDIT_SIMPLE_METADATA_FORM)}
                size="small"
                color="primary"
              >
                Save
              </Button>
            </ExpansionPanelActions>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = {
  submitForm: submit,
};

export default connect(null, mapDispatchToProps)(SimpleMetadataEditor);
