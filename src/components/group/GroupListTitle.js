import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function GroupListTitle(props) {
  return (
    <TitleHeader
      title="Group"
      helpTo="/ref/group.html"
      {...props}
    />
  );
}
