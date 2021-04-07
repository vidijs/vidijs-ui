import React from 'react';

import SquareCard from '../ui/SquareCard';
import ShapeTagEditor from './ShapeTagEditor';
import {
  ShapeTagContainerForm,
  ShapeTagAudioForm,
  ShapeTagVideoForm,
  ShapeTagThumbnailForm,
  ShapeTagAdvancedForm,
  ShapeTagOverlayForm,
  ShapeTagScriptForm,
} from './ShapeTagForm';
import {
  ShapeTagContainerDisplay,
  ShapeTagAudioDisplay,
  ShapeTagVideoDisplay,
  ShapeTagThumbnailDisplay,
  ShapeTagAdvancedDisplay,
  ShapeTagOverlayDisplay,
  ShapeTagScriptDisplay,
} from './ShapeTagDisplay';

export default function ShapeTagCard(props) {
  return (
    <>
      <SquareCard>
        <ShapeTagEditor
          title="Container"
          formComponent={ShapeTagContainerForm}
          displayComponent={ShapeTagContainerDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Video"
          formComponent={ShapeTagVideoForm}
          displayComponent={ShapeTagVideoDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Audio"
          formComponent={ShapeTagAudioForm}
          displayComponent={ShapeTagAudioDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Thumbnail"
          formComponent={ShapeTagThumbnailForm}
          displayComponent={ShapeTagThumbnailDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Overlay"
          formComponent={ShapeTagOverlayForm}
          displayComponent={ShapeTagOverlayDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Advanced"
          formComponent={ShapeTagAdvancedForm}
          displayComponent={ShapeTagAdvancedDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Script"
          formComponent={ShapeTagScriptForm}
          displayComponent={ShapeTagScriptDisplay}
          {...props}
        />
      </SquareCard>
    </>
  );
}
