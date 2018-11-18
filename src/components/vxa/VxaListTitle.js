import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function VxaListTitle(props) {
  return (
    <TitleHeader
      title="Agent"
      helpTo="/ref/vsa.html"
      {...props}
    />
  );
}
