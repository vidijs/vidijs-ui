import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ResourceListTable from './ResourceListTable';

export default function ResourceListCard({
  resourceListDocument,
  resourceType,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ResourceListTable
          resourceListDocument={resourceListDocument}
          resourceType={resourceType}
        />
      </CardContent>
    </SquareCard>
  );
}
