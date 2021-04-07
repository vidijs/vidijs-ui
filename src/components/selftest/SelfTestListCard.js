import React from 'react';

import SelfTestCard from './SelfTestCard';

export default function SelfTestListCard({
  selfTestDocument: selfTestListDocument,
}) {
  const { test: selfTestList = [] } = selfTestListDocument;
  return (
    selfTestList.map((selfTestDocument) => (
      <SelfTestCard
        key={selfTestDocument.name}
        selfTestDocument={selfTestDocument}
      />
    ))
  );
}
