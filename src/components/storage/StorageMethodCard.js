import React from 'react';

import SquareCard from '../ui/SquareCard';
import StorageMethodEditor from './StorageMethodEditor';

export default function StorageCard(props) {
  return (
    <>
      <SquareCard>
        <StorageMethodEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
