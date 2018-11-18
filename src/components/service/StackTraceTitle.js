import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function StackTraceTitle(props) {
  return (
    <TitleHeader
      title="Stack Trace"
      helpTo="/ref/vidispine-service.html"
      {...props}
    />
  );
}
