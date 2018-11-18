import React from 'react';

import SquareCard from '../ui/SquareCard';
import MetadataFieldEditor from './MetadataFieldEditor';

export default function MetadataFieldCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <MetadataFieldEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
