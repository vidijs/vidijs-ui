import React from 'react';

import SquareCard from '../../ui/SquareCard';
import IndexingEditor from './IndexingEditor';

export default function IndexingCard(props) {
  return (
    <SquareCard>
      <IndexingEditor
        {...props}
      />
    </SquareCard>
  );
}
