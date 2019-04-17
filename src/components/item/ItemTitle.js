import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import UnstyledLink from '../ui/UnstyledLink';
import { withModalNoRouter } from '../../hoc/withModal';


export const ItemHeading = ({ itemId }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="headline" color="textSecondary">
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
        variant="headline"
        component={Link}
        to={`/item/${itemId}/`}
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
  thumbnailModal,
  posterModal,
  exportModal,
  exportImpModal,
  addToCollectionModal,
  startJobModal,
  title,
  ...props
}) {
  const baseUrl = localStorage.getItem('vsBaseUrl');
  const itemParams = new URLSearchParams({
    content: 'metadata,thumbnail',
    baseURI: `${baseUrl}/APInoauth/`,
    terse: true,
    'noauth-url': true,
  });
  return (
    <TitleHeader
      grandParentTitle="Item"
      grandParentTo={`/item/?${itemParams.toString()}`}
      parentTitle={itemId}
      title={title}
      helpTo="/ref/item/item.html"
      entityId={itemId}
      entityType="item"
      removeModal={removeModal}
      actionComponent={(
        <Menu>
          <MenuItem>
            <UnstyledLink to={`/import?tab=IMPORTCOMPONENT_TAB&itemId=${itemId}`}>
              <Typography>Import Component</Typography>
            </UnstyledLink>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: addToCollectionModal })}>
            <Typography>Add To Collection</Typography>
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
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(ItemTitle);
