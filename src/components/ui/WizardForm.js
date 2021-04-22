import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import {
  reduxForm, Field, submit, destroy, getFormValues, stopSubmit, isDirty,
} from 'redux-form';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

import CodeField from './CodeField';

import * as actions from '../../actions';
import * as formActions from '../../formactions/wizard';
import StepContent from './StepContent';

function JsonDocumentForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="jsonDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <button type="submit" hidden />
    </form>
  );
}

function XMLDocumentForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="xmlDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'xml',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <button type="submit" hidden />
    </form>
  );
}

const ReduxJsonForm = reduxForm()(JsonDocumentForm);
const ReduxXMLForm = reduxForm()(XMLDocumentForm);

const EDIT_JSON_FORM = 'EDIT_JSON_FORM';
const EDIT_XML_FORM = 'EDIT_XML_FORM';
const JSON_TAB = 'JSON_TAB';
const XML_TAB = 'XML_TAB';
const EDIT_WIZARD_FORM = 'EDIT_WIZARD_FORM';

class WizardForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.onGetValues = this.onGetValues.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.state = {
      activeStep: props.initialStep || 1,
      jsonDocument: undefined,
      xmlDocument: undefined,
      tabValue: XML_TAB,
    };
  }

  componentWillUnmount() {
    this.props.destroyForm(EDIT_XML_FORM);
  }

  onBack(response) {
    if (this.state.activeStep !== 0) {
      this.setState(({ activeStep }) => ({
        activeStep: activeStep - 1,
        jsonDocument: response,
        tabValue: JSON_TAB,
      }));
    }
  }

  onNext(response) {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      jsonDocument: response,
    });
  }

  onSkip() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      jsonDocument: '',
    });
  }

  onChangeTab(event, value) {
    this.setState({ tabValue: value });
  }

  onGetValues() {
    const { formValues, stopSubmitForm, documentName } = this.props;
    try {
      const response = formActions.onStringify(formValues[documentName]);
      this.onBack(response);
    } catch (error) {
      const { errors = {} } = error;
      const { _error = error.message } = errors;
      stopSubmitForm(EDIT_WIZARD_FORM, { _error });
    }
  }

  render() {
    const {
      submitForm,
      documentName,
      FormComponent,
      isJSONFormDirty,
      isXMLFormDirty,
      onCancel,
      initialStep,
      ...formProps
    } = this.props;
    const {
      activeStep,
      jsonDocument,
      xmlDocument,
      tabValue,
    } = this.state;
    const initialValues = { [documentName]: jsonDocument };
    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>{documentName}</StepLabel>
          <StepContent>
            <Tabs
              value={tabValue}
              onChange={this.onChangeTab}
            >
              <Tab label="JSON" value={JSON_TAB} />
              <Tab label="XML" value={XML_TAB} />
            </Tabs>
            { tabValue === JSON_TAB
            && (
            <>
              <ReduxJsonForm
                form={EDIT_JSON_FORM}
                onSubmitSuccess={this.onNext}
                onSubmit={formActions.onParse}
                initialValues={{ jsonDocument }}
              />
              <AccordionActions>
                {onCancel
                && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                )}
                {jsonDocument === undefined
                && (
                <Button
                  onClick={this.onSkip}
                >
                  Skip
                </Button>
                )}
                {isJSONFormDirty
                && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => submitForm(EDIT_JSON_FORM)}
                >
                  Next
                </Button>
                )}
                {!isJSONFormDirty && jsonDocument !== undefined
                && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => submitForm(EDIT_JSON_FORM)}
                >
                  Next
                </Button>
                )}
              </AccordionActions>
            </>
            )}
            { tabValue === XML_TAB
            && (
            <>
              <ReduxXMLForm
                form={EDIT_XML_FORM}
                onSubmitSuccess={this.onNext}
                onSubmit={formActions.onParseXML}
                initialValues={{ xmlDocument }}
                destroyOnUnmount={false}
              />
              <AccordionActions>
                {onCancel
                && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                )}
                <Button
                  onClick={this.onSkip}
                >
                  Skip
                </Button>
                {isXMLFormDirty
                && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => submitForm(EDIT_XML_FORM)}
                >
                  Next
                </Button>
                )}
              </AccordionActions>
            </>
            )}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Form</StepLabel>
          <StepContent>
            <FormComponent
              form={EDIT_WIZARD_FORM}
              initialValues={initialValues}
              {...formProps}
            />
            <AccordionActions>
              <Divider />
              {onCancel
              && (
              <Button
                size="small"
                color="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              )}
              <Button
                onClick={this.onGetValues}
              >
                Back
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_WIZARD_FORM)}
              >
                Save
              </Button>
            </AccordionActions>
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: getFormValues(EDIT_WIZARD_FORM)(state),
    isJSONFormDirty: isDirty(EDIT_JSON_FORM)(state),
    isXMLFormDirty: isDirty(EDIT_XML_FORM)(state),
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  submitForm: submit,
  destroyForm: destroy,
  stopSubmitForm: stopSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
