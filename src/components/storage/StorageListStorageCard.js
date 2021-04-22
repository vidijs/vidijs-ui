import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import SquareCard from '../ui/SquareCard';
import { StorageBasicDisplay } from './StorageDisplay';
import StorageMethodListTable from './StorageMethodListTable';
import StorageStatus from './StorageStatus';

function StorageListStorageCard(props) {
  const { storageDocument, classes } = props;
  const { id: storageId } = storageDocument;
  const onClick = () => props.history.push(`/storage/${storageId}/`);
  const disableOnClick = (event) => event.stopPropagation();
  return (
    <>
      <SquareCard
        onClick={onClick}
        className={classes.onHover}
      >
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{storageId}</Typography>}
          action={<StorageStatus storageDocument={storageDocument} />}
        />
        <CardContent>
          <StorageBasicDisplay
            value={storageDocument}
          />
          <StorageMethodListTable
            onClick={disableOnClick}
            storageDocument={storageDocument}
          />
        </CardContent>
      </SquareCard>
    </>
  );
}
const hoverStyle = (theme) => ({
  onHover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

export default withRouter(withStyles(hoverStyle)(StorageListStorageCard));
