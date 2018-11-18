import React from 'react';

import SquareCard from '../ui/SquareCard';
import SimpleMetadataEditor from './SimpleMetadataEditor';

export default function SimpleMetadataCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <SimpleMetadataEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
