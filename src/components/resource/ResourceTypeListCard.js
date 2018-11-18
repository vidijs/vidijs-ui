import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ResourceTypeListTable from './ResourceTypeListTable';

export default function ResourceTypeListCard({
  resourceTypeListDocument,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ResourceTypeListTable
          resourceTypeListDocument={resourceTypeListDocument}
        />
      </CardContent>
    </SquareCard>
  );
}
