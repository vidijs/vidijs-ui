import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import MetadataForm from '../metadata/MetadataForm';

import SquareCard from '../ui/SquareCard';
import ImportImpFileForm from './ImportImpFileForm';
import ImportImpFileAdvancedForm from './ImportImpFileAdvancedForm';
import * as formActions from '../../formactions/imf';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';
import TitleHeader from '../ui/TitleHeader';

export const EDIT_IMPORTIMPFILE_FORM = 'EDIT_IMPORTIMPFILE_FORM';

function ImportImpFileWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
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
      <TitleHeader
        grandParentTitle="Import"
        parentTitle="IMF"
        title="File"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        actionComponent={(
          <Button
            color="primary"
            variant="text"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTIMPFILE_FORM)}
          >
            Start
          </Button>
        )}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>IMP File</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportImpFileForm
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTIMPFILE_FORM}
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
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  form={EDIT_IMPORTIMPFILE_FORM}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
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
                <ImportImpFileAdvancedForm
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTIMPFILE_FORM}
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

export default compose(withStepper, withUI, withFormActions)(ImportImpFileWizard);
