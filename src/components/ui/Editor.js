import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.state = {
      isEditing: props.defaultEditing || false,
    };
  }

  onSubmitSuccess(response, dispatch, props) {
    const { onSubmitSuccess } = this.props;
    this.toggleEdit();
    onSubmitSuccess(response, dispatch, props);
  }

  toggleEdit() {
    const { isEditing: currentIsEditing } = this.state;
    this.setState({ isEditing: !currentIsEditing });
  }

  render() {
    const {
      submitForm,
      initialValues,
      formComponent: FormComponent,
      formProps = {},
      displayComponent: DisplayComponent,
      displayProps = {},
      formName,
      onSubmit,
      onSubmitFail,
      title,
      iconList,
    } = this.props;
    const {
      isEditing,
    } = this.state;
    return (
      <>
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{title}</Typography>}
          action={(
            <Grid container direction="row-reverse" alignItems="center">
              <Grid item>
                {iconList}
                { FormComponent
                && (
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Edit"
                  checked={isEditing}
                  onChange={this.toggleEdit}
                />
                )}
              </Grid>
            </Grid>
          )}
        />
        <CardContent>
          {isEditing
            ? FormComponent
            && (
            <FormComponent
              form={formName}
              initialValues={initialValues}
              onSubmit={onSubmit}
              onSubmitSuccess={this.onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              {...formProps}
            />
            )
            : DisplayComponent
            && (
            <DisplayComponent
              {...displayProps}
            />
            )}
        </CardContent>
        {isEditing
          && FormComponent
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
                onClick={() => submitForm(formName)}
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
};

export default connect(null, mapDispatchToProps)(Editor);
