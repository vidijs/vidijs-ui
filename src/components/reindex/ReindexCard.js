import React from 'react';
import startCase from 'lodash.startcase';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { reindex as api } from '@vidispine/vdt-api';
import SquareCard from '../ui/SquareCard';
import ReindexDisplay from './ReindexDisplay';
import ReindexStatus from './ReindexStatus';

import withSnackbar from '../../hoc/withUI';

function ReindexCard({
  indexName,
  reindexRequestDocument,
  onSuccess,
  openSnackBar,
}) {
  const onUpdateReindex = (queryParams) => {
    api.updateReindex({ indexName, queryParams })
      .then(() => {
        const messageContent = `Reindex Request ${indexName} Updated`;
        openSnackBar({ messageContent });
        if (onSuccess) { onSuccess(indexName); }
      })
      .catch(() => {
        const messageContent = `Error Updating Reindex ${indexName} Request`;
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <SquareCard>
      <CardContent>
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{startCase(indexName)}</Typography>}
          action={<ReindexStatus reindexRequestDocument={reindexRequestDocument} />}
        />
        <CardContent>
          <ReindexDisplay
            reindexRequestDocument={reindexRequestDocument}
          />
        </CardContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => onUpdateReindex({ status: 'ABORTED' })} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => onUpdateReindex({ status: 'PAUSED' })} color="primary">
            Pause
          </Button>
          <Button onClick={() => onUpdateReindex({ status: 'IN_PROGRESS' })} color="primary">
            Resume
          </Button>
          <Button onClick={() => onUpdateReindex({ status: 'IN_QUEUE' })} color="primary">
            Start
          </Button>
        </DialogActions>
      </CardContent>
    </SquareCard>
  );
}

export default withSnackbar(ReindexCard);
