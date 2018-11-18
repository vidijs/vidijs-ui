import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function FileListTitle(props) {
  return (
    <TitleHeader
      title="File"
      helpTo="/ref/storage/file.html"
      {...props}
    />
  );
}
