import React from 'react';

import SquareCard from '../ui/SquareCard';
import MetadataDatasetEditor from './MetadataDatasetEditor';

export default function MetadataDatasetCard(props) {
  return (
    <>
      <SquareCard>
        <MetadataDatasetEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
