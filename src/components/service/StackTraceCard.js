import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import SquareCard from '../ui/SquareCard';
import TextGrid from '../ui/TextGrid';

export default function StackTraceCard({
  stacktrace,
}) {
  return (
    <SquareCard>
      <CardContent>
        {stacktrace ?
          <TextGrid
            value={stacktrace}
            variant="code"
          />
        :
          <Grid container justify="center">
            <CircularProgress size={100} color="secondary" />
          </Grid>
        }
      </CardContent>
    </SquareCard>
  );
}
