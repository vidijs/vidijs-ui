import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import SquareCard from '../ui/SquareCard';
import ImportShapeEssenceForm from './ImportShapeEssenceForm';
import ImportShapeEssenceAdvancedForm from './ImportShapeEssenceAdvancedForm';
import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';

export const EDIT_IMPORTSHAPEESSENCE_FORM = 'EDIT_IMPORTSHAPEESSENCE_FORM';

function ImportShapeEssenceWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
  itemId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Started';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Starting Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <React.Fragment>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            color="primary"
            variant="raised"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTSHAPEESSENCE_FORM)}
          >
            Import
          </Button>
        </Grid>
      </Grid>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Essence</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportShapeEssenceForm
                  onSubmit={formActions.onCreateShapeEssenceImport}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEESSENCE_FORM}
                  destroyOnUnmount={false}
                  itemId={itemId}
                />
              </CardContent>
              <ExpansionPanelActions>
                <Button
                  variant="raised"
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
                <ImportShapeEssenceAdvancedForm
                  onSubmit={formActions.onCreateShapeEssenceImport}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEESSENCE_FORM}
                  destroyOnUnmount={false}
                  itemId={itemId}
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

export default compose(withStepper, withUI, withFormActions)(ImportShapeEssenceWizard);
