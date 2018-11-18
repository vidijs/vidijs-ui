import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ItemCollectionTable from './ItemCollectionTable';

export default function ItemCollectionCard(props) {
  return (
    <SquareCard>
      <CardContent>
        <ItemCollectionTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
