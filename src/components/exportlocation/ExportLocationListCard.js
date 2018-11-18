import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ExportLocationListTable from './ExportLocationListTable';

export default function ExportLocationListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <ExportLocationListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
