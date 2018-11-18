import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ImportAccessTitle({
  openCode,
  openCreate,
  onRefresh,
  userName,
}) {
  return (
    <TitleHeader
      title="Import Access"
      grandParentTitle="User"
      grandParentTo="/user/"
      parentTitle={userName}
      parentTo={`/user/${userName}/`}
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
