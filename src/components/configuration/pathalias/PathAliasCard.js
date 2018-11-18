import React from 'react';

import SquareCard from '../../ui/SquareCard';
import PathAliasEditor from './PathAliasEditor';

export default function PathAliasCard(props) {
  return (
    <SquareCard>
      <PathAliasEditor
        {...props}
      />
    </SquareCard>
  );
}
