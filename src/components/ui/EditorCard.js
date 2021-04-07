import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import SquareCard from './SquareCard';

export const DefaultToggleComponent = ({ isEditing, toggleEdit }) => (
  <FormControlLabel
    control={<Switch color="primary" />}
    label="Edit"
    checked={isEditing}
    onChange={toggleEdit}
  />
);

export const DefaultRemoveComponent = ({ onRemove }) => (
  <IconButton onClick={onRemove}>
    <Delete />
  </IconButton>
);

export const DefaultActionComponent = ({
  toggleComponent: ToggleComponent = DefaultToggleComponent,
  toggleProps = {},
  removeComponent: RemoveComponent = DefaultRemoveComponent,
  removeProps = {},
  isEditing,
  toggleEdit,
  onRemove,
  ...props
}) => (
  <>
    {onRemove && (
      <RemoveComponent
        onRemove={onRemove}
        {...removeProps}
        {...props}
      />
    )}
    {toggleEdit && (
      <ToggleComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        {...toggleProps}
        {...props}
      />
    )}
  </>
);

export const DefaultCardHeaderComponent = ({
  actionComponent: ActionComponent = DefaultActionComponent,
  actionProps = {},
  isEditing,
  toggleEdit,
  onRemove,
  cardHeaderProps = {},
  ...props
}) => (
  <CardHeader
    action={(
      <ActionComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        onRemove={onRemove}
        {...actionProps}
        {...props}
      />
    )}
    {...cardHeaderProps}
  />
);

export const DefaultCardContentComponent = ({
  editComponent: EditComponent,
  editProps = {},
  displayComponent: DisplayComponent,
  displayProps = {},
  isEditing,
  ...props
}) => (
  <CardContent>
    {isEditing ? (
      <EditComponent {...editProps} {...props} />
    ) : (
      <DisplayComponent {...displayProps} {...props} />
    )}
  </CardContent>
);

export const DefaultCardComponent = ({ children }) => <SquareCard>{children}</SquareCard>;

export const DefaultCardActionComponent = ({
  isEditing = false,
  toggleEdit,
  onSave,
  saveProps = {},
  cancelProps = {},
}) => (
  isEditing ? (
    <>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          onClick={toggleEdit}
          {...cancelProps}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          size="small"
          color="primary"
          {...saveProps}
        >
          Save
        </Button>
      </AccordionActions>
    </>
  ) : null
);

const EditorCard = ({
  initialState = false,
  editComponent: EditComponent,
  editProps = {},
  displayComponent: DisplayComponent,
  displayProps = {},
  cardComponent: CardComponent = DefaultCardComponent,
  cardProps = {},
  cardHeaderComponent: CardHeaderComponent = DefaultCardHeaderComponent,
  cardHeaderProps = {},
  cardContentComponent: CardContentComponent = DefaultCardContentComponent,
  cardContentProps = {},
  cardActionComponent: CardActionComponent = DefaultCardActionComponent,
  cardActionProps = {},
  onRemove,
  onSave,
  ...props
}) => {
  const [isEditing, setIsEditing] = React.useState(initialState);
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <CardComponent {...cardProps} {...props}>
      <CardHeaderComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        onRemove={onRemove}
        cardHeaderProps={cardHeaderProps}
        {...props}
      />
      <CardContentComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        editComponent={EditComponent}
        editProps={editProps}
        displayComponent={DisplayComponent}
        displayProps={displayProps}
        {...cardContentProps}
        {...props}
      />
      <CardActionComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        onSave={onSave}
        {...cardActionProps}
        {...props}
      />
    </CardComponent>
  );
};

export default EditorCard;
