import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ExternalIdTable from './ExternalIdTable';

export default function ExternalIdCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <ExternalIdTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
