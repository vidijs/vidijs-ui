import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import ImportShapePlaceholderForm from './ImportShapePlaceholderForm';
import ImportShapePlaceholderAdvancedForm from './ImportShapePlaceholderAdvancedForm';
import MetadataForm from '../metadata/MetadataForm';
import SquareCard from '../ui/SquareCard';
import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';
import TitleHeader from '../ui/TitleHeader';

export const EDIT_IMPORTSHAPEPLACEHOLDER_FORM = 'EDIT_IMPORTSHAPEPLACEHOLDER_FORM';

function ImportShapePlaceholderWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
}) {
  const defaultValues = {
    queryParams: {
      container: 1,
      tag: ['original'],
    },
    ...initialValues,
  };
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Placeholder Shape Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Placeholder Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <React.Fragment>
      <TitleHeader
        parentTitle="Import"
        title="Placeholder Shape"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        actionComponent={(
          <Button
            color="primary"
            variant="text"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM)}
          >
            Create
          </Button>
        )}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Placeholder Shape</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportShapePlaceholderForm
                  onSubmit={formActions.onCreateShapePlaceholder}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEPLACEHOLDER_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={onNext}
                >
                  Next
                </Button>
              </ExpansionPanelActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Metadata</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <MetadataForm
                  onSubmit={formActions.onCreateShapePlaceholder}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEPLACEHOLDER_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button onClick={onBack}>
                  Back
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={onNext}
                >
                  Next
                </Button>
              </ExpansionPanelActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Advanced</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportShapePlaceholderAdvancedForm
                  onSubmit={formActions.onCreateShapePlaceholder}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEPLACEHOLDER_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button onClick={onBack}>
                  Back
                </Button>
              </ExpansionPanelActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </React.Fragment>

  );
}


export default compose(withStepper, withUI, withFormActions)(ImportShapePlaceholderWizard);
