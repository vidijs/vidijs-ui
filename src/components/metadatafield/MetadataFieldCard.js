import React from 'react';

import SquareCard from '../ui/SquareCard';
import MetadataFieldEditor from './MetadataFieldEditor';

export default function MetadataFieldCard(props) {
  return (
    <>
      <SquareCard>
        <MetadataFieldEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
