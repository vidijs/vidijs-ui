import React from 'react';
import Grid from '@material-ui/core/Grid';
import Panorama from '@material-ui/icons/Panorama';

const PlaceholderThumbnail = () => (
  <Grid container justify="center" alignItems="center">
    <Grid item>
      <Panorama style={{ fontSize: 200 }} />
    </Grid>
  </Grid>
);

export default PlaceholderThumbnail;
