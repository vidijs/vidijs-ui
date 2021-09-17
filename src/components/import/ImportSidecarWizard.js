import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AccordionActions from '@material-ui/core/AccordionActions';

import SquareCard from '../ui/SquareCard';
import ImportSidecarForm from './ImportSidecarForm';
import * as formActions from '../../formactions/import';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';
import TitleHeader from '../ui/TitleHeader';

export const EDIT_IMPORTSIDECAR_FORM = 'EDIT_IMPORTSIDECAR_FORM';

function ImportSidecarWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
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
    <>
      <TitleHeader
        parentTitle="Import"
        title="Essence"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        actionComponent={(
          <Button
            color="primary"
            variant="text"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTSIDECAR_FORM)}
          >
            Start
          </Button>
        )}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Sidecar</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportSidecarForm
                  onSubmit={formActions.onImportSidecar}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSIDECAR_FORM}
                  destroyOnUnmount={false}
                  itemId={itemId}
                />
              </CardContent>
              <AccordionActions>
                <Button
                  color="primary"
                  variant="text"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTSIDECAR_FORM)}
                >
                  Start
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(withStepper, withUI, withFormActions)(ImportSidecarWizard);
