import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ProjectionListTable from './ProjectionListTable';

export default function ProjectionListCard({
  projectionList,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ProjectionListTable
          projectionList={projectionList}
        />
      </CardContent>
    </SquareCard>
  );
}
