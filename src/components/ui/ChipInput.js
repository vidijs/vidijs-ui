import React from 'react';
import ChipInput from 'material-ui-chip-input';
import update from 'immutability-helper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  chipContainer: {
    minWidth: 260,
  },
};

function WrappedChipInput({
  classes,
  input,
  simple = false,
  ...props
}) {
  const onBlur = (event) => {
    if (event.target.value) {
      const blurTarget = simple ? [event.target.value] : [{ value: event.target.value }];
      if (typeof input.value === 'object') {
        const newValue = update(
          input.value,
          { $push: blurTarget },
        );
        input.onBlur(newValue);
      } else {
        input.onBlur(blurTarget);
      }
    } else {
      input.onBlur(input.value);
    }
  };
  const onDelete = (chip, i) => {
    const newValue = update(
      input.value,
      { $splice: [[i, 1]] },
    );
    input.onChange(newValue);
  };
  const value = (typeof input.value === 'string') ? undefined : input.value;
  const dataSourceConfig = simple ? undefined : { value: 'value', text: 'value' };
  return (
    <ChipInput
      {...input}
      {...props}
      dataSourceConfig={dataSourceConfig}
      value={value}
      onDelete={onDelete}
      onBlur={onBlur}
      classes={{ chipContainer: classes.chipContainer }}
    />
  );
}

export default withStyles(styles)(WrappedChipInput);
