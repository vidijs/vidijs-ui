import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default function DrawerListItem({
  listText,
  listItemProps = {},
}) {
  return (
    <ListItem
      style={{ paddingLeft: 8 }}
      disableGutters
      button
      {...listItemProps}
    >
      <ListItemIcon>
        <Avatar style={{ height: 25, width: 25 }}>{listText[0]}</Avatar>
      </ListItemIcon>
      <ListItemText secondary={listText} />
    </ListItem>
  );
}
