import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import AuditLogTable from './AuditLogTable';

export default function AuditLogCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <AuditLogTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
