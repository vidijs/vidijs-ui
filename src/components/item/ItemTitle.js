import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import UnstyledLink from '../ui/UnstyledLink';
import { withModalNoRouter } from '../../hoc/withModal';
import routes from '../../const/routes';

export const ItemHeading = ({ itemId }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="h5" color="textSecondary">
        Item
      </Typography>
    </Grid>
    <Grid item>
      <IconButton disabled>
        <ArrowForwardIos />
      </IconButton>
    </Grid>
    <Grid item>
      <Typography
        variant="h5"
        component={Link}
        to={routes.itemList({ itemId })}
        style={{ textDecoration: 'none' }}
      >
        {itemId}
      </Typography>
    </Grid>
  </Grid>
);

function ItemTitle({
  itemId,
  onOpen,
  removeModal,
  transcodeModal,
  relationModal,
  thumbnailModal,
  posterModal,
  exportModal,
  exportImpModal,
  addToCollectionModal,
  startJobModal,
  title,
  createModal,
  createTooltip = 'New',
  ...props
}) {
  return (
    <TitleHeader
      grandParentTitle="Item"
      grandParentTo={routes.itemList()}
      parentTitle={itemId}
      title={title}
      helpTo="/ref/item/item.html"
      entityId={itemId}
      entityType="item"
      removeModal={removeModal}
      actionComponent={(
        <>
          {createModal && (
          <Tooltip title={createTooltip}>
            <IconButton onClick={() => onOpen({ modalName: createModal })}>
              <PlaylistAdd />
            </IconButton>
          </Tooltip>
          )}
          <Menu>
            <MenuItem>
              <UnstyledLink to={`/import?tab=IMPORTCOMPONENT_TAB&itemId=${itemId}`}>
                <Typography>Import Component</Typography>
              </UnstyledLink>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: addToCollectionModal })}>
              <Typography>Add To Collection</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: relationModal })}>
              <Typography>Add Relation</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: startJobModal })}>
              <Typography>Start Job</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: transcodeModal })}>
              <Typography>Transcode</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: thumbnailModal })}>
              <Typography>Create Thumbnail</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: posterModal })}>
              <Typography>Create Poster</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: exportModal })}>
              <Typography>Export</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: exportImpModal })}>
              <Typography>Export IMF Package</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
              <Typography color="secondary">Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(ItemTitle);
