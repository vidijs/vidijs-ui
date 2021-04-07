import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import SquareCard from '../ui/SquareCard';
import TextGrid from '../ui/TextGrid';
import ItemGridListTile from './ItemGridListTile';

function ItemListCard({
  itemListDocument,
  queryParams = {},
  history,
}) {
  if (itemListDocument === undefined) { return null; }
  const { item: itemList = [] } = itemListDocument;
  const { terse, content = [] } = queryParams;
  const hasThumbnail = content.includes('thumbnail');
  const onClick = (itemId) => () => history.push(`/item/${itemId}/`);
  return (
    <>
      {itemList.map((itemType) => (
        <SquareCard onClick={onClick(itemType.id)} key={itemType.id}>
          <CardHeader subheader={`Item ${itemType.id}`} />
          <CardContent>
            <Grid container>
              {hasThumbnail && (
              <Grid item>
                <GridList cellHeight="auto">
                  <ItemGridListTile itemType={itemType} />
                </GridList>
              </Grid>
              )}
              <Grid item xs={12} sm>
                <TextGrid title="itemId" value={itemType.id} />
                {(terse && itemType.terse) && (
                  Object.keys(itemType.terse).map((fieldName) => (
                    <TextGrid
                      key={fieldName}
                      title={fieldName}
                      value={itemType.terse[fieldName] && itemType.terse[fieldName].value}
                    />
                  ))
                )}
              </Grid>
            </Grid>
          </CardContent>
        </SquareCard>
      ))}
    </>
  );
}

export default withRouter(ItemListCard);
