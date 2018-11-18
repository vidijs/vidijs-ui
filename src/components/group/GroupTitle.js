import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function GroupTitle({
  groupName,
  onOpen,
  onEnable,
  onDisable,
  realNameModal,
  tokenModal,
  passwordModal,
  ...props
}) {
  return (
    <TitleHeader
      helpTo="/ref/group.html"
      title={groupName}
      parentTitle="Group"
      parentTo="/group/"
      {...props}
    />
  );
}
