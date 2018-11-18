import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ErrorLogTitle(props) {
  return (
    <TitleHeader
      title="Error Log"
      helpTo="/ref/xml-schema.html?#schema-element-ErrorLogListDocument"
      {...props}
    />
  );
}
