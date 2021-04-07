import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AccordionActions from '@material-ui/core/AccordionActions';

import SquareCard from '../components/ui/SquareCard';
import TitleHeader from '../components/ui/TitleHeader';
import withStepper from '../hoc/withStepper';
import { StorageBasicForm, StorageMethodForm } from '../components/storage/StorageForm';
import AutoImportRuleForm from '../components/autoimport/AutoImportRuleForm';
import PropertiesForm from '../components/configuration/properties/PropertiesForm';

const EDIT_STORAGE_FORM = 'EDIT_STORAGE_FORM';
const EDIT_STORAGEMETHOD_FORM = 'EDIT_STORAGEMETHOD_FORM';
const EDIT_AUTOIMPORT_FORM = 'EDIT_AUTOIMPORT_FORM';
const EDIT_CONFIGURATIONPROPERTIES_FORM = 'EDIT_CONFIGURATIONPROPERTIES_FORM';

function Watchfolder({
  onNext,
  onBack,
  activeStep,
}) {
  return (
    <>
      <TitleHeader
        title="Watchfolder Setup"
        helpTo="/ref/storage/storage.html"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Storage</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <StorageBasicForm
                  form={EDIT_STORAGE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={onNext}
                >
                  Next
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Method</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <StorageMethodForm
                  form={EDIT_STORAGEMETHOD_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
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
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Auto Import Rule</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <AutoImportRuleForm
                  form={EDIT_AUTOIMPORT_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
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
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Configuration Properties</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <PropertiesForm
                  form={EDIT_CONFIGURATIONPROPERTIES_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>
                  Back
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(withStepper)(Watchfolder);
