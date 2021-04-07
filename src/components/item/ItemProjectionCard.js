import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import ItemProjection from './ItemProjection';
import SquareCard from '../ui/SquareCard';

function ItemProjectionCard(props) {
  return (
    <SquareCard>
      <CardContent>
        <ItemProjection
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}

export default ItemProjectionCard;
