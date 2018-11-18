import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import FieldGroupListTable from './FieldGroupListTable';

export default function FieldGroupListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <FieldGroupListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
