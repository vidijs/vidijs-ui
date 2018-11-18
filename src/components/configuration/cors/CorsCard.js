import React from 'react';

import SquareCard from '../../ui/SquareCard';
import CorsEditor from './CorsEditor';

export default function CorsCard(props) {
  return (
    <SquareCard>
      <CorsEditor
        {...props}
      />
    </SquareCard>
  );
}
