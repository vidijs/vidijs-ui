import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../../ui/SquareCard';
import PropertiesTable from './PropertiesTable';

export default function PropertiesCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <PropertiesTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
