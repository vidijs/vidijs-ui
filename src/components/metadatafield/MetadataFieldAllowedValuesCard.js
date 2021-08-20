import React from 'react';

import SquareCard from '../ui/SquareCard';
import MetadataFieldAllowedValuesTable from './MetadataFieldAllowedValuesTable';

export default function MetadataFieldAllowedValuesCard(props) {
  return (
    <SquareCard>
      <MetadataFieldAllowedValuesTable
        {...props}
      />
    </SquareCard>
  );
}
