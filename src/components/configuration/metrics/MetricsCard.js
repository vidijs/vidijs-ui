import React from 'react';

import SquareCard from '../../ui/SquareCard';
import MetricsEditor from './MetricsEditor';

export default function MetricsCard(props) {
  return (
    <SquareCard>
      <MetricsEditor
        {...props}
      />
    </SquareCard>
  );
}
