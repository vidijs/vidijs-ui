import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import FilePrefixTable from './FilePrefixTable';

export default function FilePrefixCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <FilePrefixTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
