import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import EchoForm from './EchoForm';

const ECHO_FORM = 'ECHO_FORM';

export default function EchoCard({
  onSubmit,
  submitForm,
  cmRef,
}) {
  return (
    <>
      <CardHeader
        title="XML Echo"
      />
      <Card elevation={0}>
        <CardContent>
          <EchoForm
            onSubmit={onSubmit}
            cmRef={cmRef}
            form={ECHO_FORM}
          />
        </CardContent>
        <DialogActions>
          <Button
            size="small"
            color="primary"
            onClick={() => submitForm(ECHO_FORM)}
          >
            Submit
          </Button>
        </DialogActions>
      </Card>
    </>
  );
}
