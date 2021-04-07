import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import SquareCard from '../ui/SquareCard';
import NotificationAction from './NotificationAction';
import NotificationTrigger from './NotificationTrigger';
import NotificationActionForm from './NotificationActionForm';
import NotificationTriggerForm from './NotificationTriggerForm';
import * as formActions from '../../formactions/notification';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';

export const NOTIFICATION_EDIT_FORM = 'NOTIFICATION_EDIT_FORM';

function NotificationCard({
  notificationId,
  entityType,
  notificationDocument,
  submitForm,
  onRefresh,
  isEditing,
  toggleEdit,
  valueSelector,
  openSnackBar,
}) {
  if (notificationDocument === undefined) { return null; }
  const onSubmitSuccess = () => {
    const messageContent = 'Notification Updated';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
    if (toggleEdit) { toggleEdit(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Notification';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const { action, trigger } = notificationDocument;
  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={10}>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ textDecoration: 'none' }}
          >
            Trigger
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Edit"
                checked={isEditing}
                onChange={toggleEdit}
              />
            </Grid>
            <Grid item>
              {isEditing
              && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => submitForm(NOTIFICATION_EDIT_FORM)}
              >
                Save
              </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SquareCard>
        <CardContent>
          {isEditing
            ? (
              <NotificationTriggerForm
                notificationId={notificationId}
                entityType={entityType}
                form={NOTIFICATION_EDIT_FORM}
                onSubmit={formActions.onUpdate}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                initialValues={{ notificationDocument }}
                valueSelector={valueSelector}
              />
            )
            : (
              <NotificationTrigger
                notificationId={notificationId}
                trigger={trigger}
                entityType={entityType}
              />
            )}
        </CardContent>
      </SquareCard>
      <Typography
        variant="h5"
        color="textSecondary"
        style={{ textDecoration: 'none' }}
      >
        Action
      </Typography>
      <SquareCard>
        <CardContent>
          {isEditing
            ? (
              <NotificationActionForm
                notificationId={notificationId}
                entityType={entityType}
                form={NOTIFICATION_EDIT_FORM}
                onSubmit={formActions.onUpdate}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                initialValues={{ notificationDocument }}
                valueSelector={valueSelector}
              />
            )
            : (
              <NotificationAction
                notificationId={notificationId}
                action={action}
                entityType={entityType}
              />
            )}

        </CardContent>
      </SquareCard>
    </>
  );
}

export default compose(
  withUI,
  withFormActions,
  withFormSelectors,
)(NotificationCard, NOTIFICATION_EDIT_FORM);
