import React from 'react';

import SquareCard from '../ui/SquareCard';
import StorageMethodEditor from './StorageMethodEditor';

export default function StorageCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <StorageMethodEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
