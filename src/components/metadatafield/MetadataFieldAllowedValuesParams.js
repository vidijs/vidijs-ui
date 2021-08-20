import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import Accordion from '../ui/Accordion';
import MetadataFieldAllowedValuesParamsForm from './MetadataFieldAllowedValuesParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/metadatafield';

export const METADATAFIELDALLOWEDVALUES_PARAMS_FORM = 'METADATAFIELDALLOWEDVALUES_PARAMS_FORM';

function MetadataFieldAllowedValuesParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  fieldName,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Allowed Values Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Allowed Values';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Constraint Values
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MetadataFieldAllowedValuesParamsForm
          form={METADATAFIELDALLOWEDVALUES_PARAMS_FORM}
          onSubmit={formActions.onGetAllowedValues}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          fieldName={fieldName}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          onClick={() => resetForm(METADATAFIELDALLOWEDVALUES_PARAMS_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(METADATAFIELDALLOWEDVALUES_PARAMS_FORM)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(MetadataFieldAllowedValuesParams);
