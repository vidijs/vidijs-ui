import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ExternalIdNamespaceTable from './ExternalIdNamespaceTable';

export default function ExternalIdNamespaceCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <ExternalIdNamespaceTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
