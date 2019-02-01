import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';

export const ShapeHeading = ({ shapeId }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="headline" color="textSecondary">
        Shape
      </Typography>
    </Grid>
    <Grid item>
      <IconButton disabled>
        <ArrowForwardIos />
      </IconButton>
    </Grid>
    <Grid item>
      <Typography variant="headline">
        {shapeId}
      </Typography>
    </Grid>
  </Grid>
);

function ShapeTitle({
  itemId,
  shapeId,
  onOpen,
  transcodeModal,
  removeModal,
  ...props
}) {
  const baseUrl = localStorage.getItem('vsBaseUrl');
  const itemParams = new URLSearchParams({
    content: 'metadata,thumbnail',
    baseURI: `${baseUrl}/APInoauth/`,
    terse: true,
    'noauth-url': true,
  });
  return (
    <TitleHeader
      grandParentTitle="Item"
      grandParentTo={`/item/?${itemParams.toString()}`}
      parentTitle={itemId}
      parentTo={`/item/${itemId}?tab=ITEM_SHAPE_TAB`}
      title={(<ShapeHeading shapeId={shapeId} />)}
      actionComponent={(
        <Menu>
          <MenuItem onClick={() => onOpen({ modalName: transcodeModal })}>
            <Typography>Transcode</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
            <Typography color="secondary">Delete</Typography>
          </MenuItem>
        </Menu>
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(ShapeTitle);
