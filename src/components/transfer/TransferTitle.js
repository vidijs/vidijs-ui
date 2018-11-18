import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function TransferTitle(props) {
  return (
    <TitleHeader
      title="Transfer"
      helpTo="/ref/transfer.html"
      {...props}
    />
  );
}
