import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '../ui/ExpansionPanel';
import ItemRelationListParamsForm from './ItemRelationListParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/item';

export const ITEM_RELATION_LIST_PARAMS_FORM = 'ITEM_RELATION_LIST_PARAMS_FORM';

function ItemRelationListParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  itemId,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Item Relations';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" color="textSecondary">
          Item Relation Options
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ItemRelationListParamsForm
          form={ITEM_RELATION_LIST_PARAMS_FORM}
          onSubmit={formActions.onListItemRelation}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          {...formProps}
        />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(ITEM_RELATION_LIST_PARAMS_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(ITEM_RELATION_LIST_PARAMS_FORM)}
        >
          Update
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withSnackbar, withFormActions)(ItemRelationListParams);
