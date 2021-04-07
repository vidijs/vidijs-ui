import React from 'react';

import ShapeTitle, { ShapeHeading } from './ShapeTitle';
import ShapeOverview from './ShapeOverview';

export default function ShapeOverviewList({ shapeList = [], itemId }) {
  if (shapeList === undefined || !Array.isArray(shapeList)) { return null; }
  return (
    shapeList.map((shapeDocument) => (
      <React.Fragment
        key={shapeDocument.id}
      >
        {itemId ? (
          <ShapeTitle
            shapeId={shapeDocument.id}
            itemId={itemId}
          />
        ) : (
          <ShapeHeading
            shapeId={shapeDocument.id}
          />
        )}
        <ShapeOverview
          shapeDocument={shapeDocument}
        />
      </React.Fragment>
    ))
  );
}
