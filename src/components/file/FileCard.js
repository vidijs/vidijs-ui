import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import { FileBasicDisplay } from './FileDisplay';

export default function FileCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <FileBasicDisplay
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
