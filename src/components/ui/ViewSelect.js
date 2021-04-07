import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import ViewModule from '@material-ui/icons/ViewModule';
import ViewStream from '@material-ui/icons/ViewStream';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

export const CARD_VIEW = 'CARD_VIEW';
export const GRID_VIEW = 'GRID_VIEW';
export const ROW_VIEW = 'ROW_VIEW';

export default function ViewSelect({ isActive = ROW_VIEW, onChange }) {
  const handleChange = (newActive) => () => onChange(newActive);
  return (
    <Grid container>
      <Grid item>
        <Tooltip title="Row">
          <IconButton onClick={handleChange(ROW_VIEW)}>
            <ViewHeadline
              color={isActive === ROW_VIEW ? 'action' : 'disabled'}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Card">
          <IconButton onClick={handleChange(CARD_VIEW)}>
            <ViewStream
              color={isActive === CARD_VIEW ? 'action' : 'disabled'}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Grid">
          <IconButton onClick={handleChange(GRID_VIEW)}>
            <ViewModule
              color={isActive === GRID_VIEW ? 'action' : 'disabled'}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
