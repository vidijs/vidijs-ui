import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';

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

export default function ShapeTitle({
  itemId,
  shapeId,
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
      parentTo={`/item/${itemId}`}
      title={(<ShapeHeading shapeId={shapeId} />)}
      {...props}
    />
  );
}
