import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ErrorLogTable from './ErrorLogTable';

export default function ErrorLogCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <ErrorLogTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
