import React from 'react';
import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import withSnackbar from '../../hoc/withSnackbar';
import withFormActions from '../../hoc/withFormActions';
import * as formActions from '../../formactions/javascript';
import SquareCard from '../ui/SquareCard';
import TextGrid from '../ui/TextGrid';

import TestForm from './TestForm';

export const TEST_FORM = 'TEST_FORM';

function TestCard({
  submitForm,
  openSnackBar,
  onSuccess,
  onFail,
  result,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Script Success';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (errors, dispatch, submitError, props) => {
    const messageContent = 'Error Running Script';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(errors, dispatch, submitError, props); }
  };
  return (
    <React.Fragment>
      <CardHeader
        title="Javascript Test"
        action={(
          <Button
            variant="text"
            color="primary"
            onClick={() => submitForm(TEST_FORM)}
          >
            RUN
          </Button>
        )}
      />
      <SquareCard>
        <CardContent>
          <TestForm
            onSubmit={formActions.onTest}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            form={TEST_FORM}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardContent>
          <TextGrid
            title="Result"
            value={result}
            variant="code"
          />
        </CardContent>
      </SquareCard>
    </React.Fragment>
  );
}

export default compose(withSnackbar, withFormActions)(TestCard);
