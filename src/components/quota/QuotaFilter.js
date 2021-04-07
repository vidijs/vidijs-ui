import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import QuotaFilterForm from './QuotaFilterForm';
import * as formActions from '../../formactions/quota';
import * as actions from '../../actions';

const EDIT_QUOTA_FILTER_FORM = 'EDIT_QUOTA_FILTER_FORM';

function QuotaFilter({
  submitForm,
  onFilter,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { quotaRuleListDocument, queryParams } = response;
    onFilter({ quotaRuleListDocument, queryParams });
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Filtering Quota';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const initialValues = {
    queryParams: {
      exceeded: false,
      filter: [{}],
    },
  };
  return (
    <SquareCard>
      <CardContent>
        <CardHeader
          action={(
            <Button
              size="small"
              color="primary"
              onClick={() => submitForm(EDIT_QUOTA_FILTER_FORM)}
            >
              Search
            </Button>
          )}
        />
        <CardContent>
          <QuotaFilterForm
            form={EDIT_QUOTA_FILTER_FORM}
            onSubmit={formActions.onList}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            initialValues={initialValues}
          />
        </CardContent>
      </CardContent>
    </SquareCard>
  );
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(QuotaFilter);
