import React from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import ProjectionForm from './ProjectionForm';
import * as formActions from '../../formactions/projection';
import SquareCard from '../ui/SquareCard';
import withSnackbar from '../../hoc/withSnackbar';
import withFormActions from '../../hoc/withFormActions';

export const EDIT_PROJECTION_INCOMING_FORM = 'EDIT_PROJECTION_INCOMING_FORM';
export const EDIT_PROJECTION_OUTGOING_FORM = 'EDIT_PROJECTION_OUTGOING_FORM';

function ProjectionCard({
  submitForm,
  onSuccess,
  openSnackBar,
  projectionId,
  incomingProjectionDocument,
  outgoingProjectionDocument,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Projection Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Projection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <>
      <SquareCard>
        <CardHeader
          title={<Typography variant="subtitle1">Incoming</Typography>}
          disableTypography
          action={(
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={() => submitForm(EDIT_PROJECTION_INCOMING_FORM)}
            >
              Save Incoming
            </Button>
          )}
        />
        <CardContent>
          <ProjectionForm
            form={EDIT_PROJECTION_INCOMING_FORM}
            onSubmit={formActions.onUpdateIncoming}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            initialValues={{ projectionDocument: incomingProjectionDocument }}
            projectionId={projectionId}
            enableReinitialize
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardHeader
          title={<Typography variant="subtitle1">Outgoing</Typography>}
          disableTypography
          action={(
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={() => submitForm(EDIT_PROJECTION_OUTGOING_FORM)}
            >
              Save Outgoing
            </Button>
          )}
        />
        <CardContent>
          <ProjectionForm
            form={EDIT_PROJECTION_OUTGOING_FORM}
            onSubmit={formActions.onUpdateOutgoing}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            initialValues={{ projectionDocument: outgoingProjectionDocument }}
            projectionId={projectionId}
            enableReinitialize
          />
        </CardContent>
      </SquareCard>
    </>
  );
}

export default compose(withSnackbar, withFormActions)(ProjectionCard);
