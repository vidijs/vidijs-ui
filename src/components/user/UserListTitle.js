import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function UserListTitle(props) {
  return (
    <TitleHeader
      title="User"
      helpTo="/ref/user.html"
      {...props}
    />
  );
}
