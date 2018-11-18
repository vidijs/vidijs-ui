import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { DescriptorComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeDescriptorComponentCard({ descriptorComponent = {} }) {
  if (descriptorComponent === undefined) { return null; }
  const { id: descriptorComponentId } = descriptorComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subheading">{`Descriptor Component - ${descriptorComponentId}`}</Typography>}
      />
      <CardContent>
        <DescriptorComponentType
          value={descriptorComponent}
        />
      </CardContent>
    </SquareCard>
  );
}
