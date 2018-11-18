import React from 'react';

import SquareCard from '../../ui/SquareCard';
import FtpPoolEditor from './FtpPoolEditor';

export default function FtpPoolCard(props) {
  return (
    <SquareCard>
      <FtpPoolEditor
        {...props}
      />
    </SquareCard>
  );
}
