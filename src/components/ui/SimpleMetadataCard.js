import React from 'react';

import SquareCard from './SquareCard';
import SimpleMetadataEditor from './SimpleMetadataEditor';

export default function SimpleMetadataCard(props) {
  return (
    <>
      <SquareCard>
        <SimpleMetadataEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
