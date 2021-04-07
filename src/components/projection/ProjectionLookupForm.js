import React from 'react';
import { reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ProjectionSelect from './ProjectionSelect';

function ProjectionLookupForm({
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid item>
          <Typography variant="caption">
            Projection Name
          </Typography>
          <ProjectionSelect
            name="projectionId"
            creatable={false}
            isClearable
          />
        </Grid>
      </Grid>
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ProjectionLookupForm);
