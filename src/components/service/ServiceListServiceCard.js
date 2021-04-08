import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import startCase from 'lodash.startcase';

import SquareCard from '../ui/SquareCard';
import ServiceDisplay from './ServiceDisplay';

function ServiceListServiceCard({
  vidispineServiceDocument,
  classes,
  onDisable,
  onEnable,
}) {
  return (
    <>
      <SquareCard
        className={classes.onHover}
      >
        <CardHeader
          disableTypography
          title={(
            <Typography variant="subtitle1">
              {startCase(vidispineServiceDocument.name)}
            </Typography>
          )}
          action={(
            <Grid container direction="row-reverse" alignItems="center">
              <Grid item>
                {vidispineServiceDocument.isEnabled
                  ? (
                    <Button
                      onClick={() => onDisable({ serviceName: vidispineServiceDocument.name })}
                      color="secondary"
                    >
                      Disable
                    </Button>
                  )
                  : (
                    <Button
                      onClick={() => onEnable({ serviceName: vidispineServiceDocument.name })}
                      color="primary"
                    >
                      Enable
                    </Button>
                  )}
              </Grid>
            </Grid>
          )}
        />
        <CardContent>
          <ServiceDisplay
            vidispineServiceDocument={vidispineServiceDocument}
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

export default withStyles(hoverStyle)(ServiceListServiceCard);
