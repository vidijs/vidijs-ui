import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

export default function ItemThumbnailGrid({
  uriListDocument,
}) {
  if (uriListDocument === undefined) { return null; }
  const { uri: uriList = [] } = uriListDocument;
  const splitUri = (thisUri) => {
    let [output] = thisUri.split('?');
    [, output] = output.split(';');
    return output;
  };
  return (
    <GridList cellHeight="auto" cols={3}>
      {uriList.map((thisUri) => (
        <GridListTile key={thisUri}>
          <img src={thisUri} alt={thisUri} />
          <GridListTileBar
            title={splitUri(thisUri)}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
