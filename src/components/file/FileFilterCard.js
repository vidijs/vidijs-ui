import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import FileFilter from './FileFilter';

export default function FileFilterCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <FileFilter
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
