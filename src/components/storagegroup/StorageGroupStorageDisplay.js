import React from 'react';

import TextGrid from '../ui/TextGrid';
import bytesToSize from '../../utils/bytesToSize';

export default function StorageGroupStorageDisplay({
  storageDocument,
}) {
  const capacityAvailable =
  Math.round((storageDocument.freeCapacity / storageDocument.capacity) * 100);
  return (
    <React.Fragment>
      <TextGrid title="Type" value={storageDocument.type} />
      <TextGrid title="State" value={storageDocument.state} />
      <TextGrid title="Capacity" value={`${bytesToSize(storageDocument.capacity)} (${capacityAvailable}% Available)`} />
    </React.Fragment>
  );
}
