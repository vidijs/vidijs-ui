import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

export default function ChipArray({ labels = [] }) {
  return (
    <Grid container>
      {labels.map((label) => (
        <Grid item sm={2} key={label}>
          <Chip label={label} />
        </Grid>
      ))}
    </Grid>
  );
}
