import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import FileListTable from './FileListTable';

export default function FileListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <FileListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
