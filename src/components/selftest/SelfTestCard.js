import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import startCase from 'lodash.startcase';

import SquareCard from '../ui/SquareCard';
import SelfTestDisplay from './SelfTestDisplay';
import SelfTestStatus from './SelfTestStatus';

export default function SelfTestCard(props) {
  return (
    <>
      <SquareCard>
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{startCase(props.selfTestDocument.name)}</Typography>}
          action={
            <SelfTestStatus selfTestDocument={props.selfTestDocument} />
          }
        />
        <CardContent>
          <SelfTestDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
    </>
  );
}
