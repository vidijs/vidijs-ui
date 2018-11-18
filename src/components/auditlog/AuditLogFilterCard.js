import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import AuditLogFilter from './AuditLogFilter';

export default function AuditLogFilterCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <AuditLogFilter
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
