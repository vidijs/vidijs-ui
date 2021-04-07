import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../components/ui/SquareCard';

const withCard = (WrappedComponent) => (props) => (
  <SquareCard>
    <CardContent>
      <WrappedComponent {...props} />
    </CardContent>
  </SquareCard>
);

export default withCard;
