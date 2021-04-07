import React from 'react';
import { Checkbox } from '../form';

const BoolCheckbox = (p) => (
  <Checkbox
    value={p.input.checked}
    checked={p.input.checked}
    onClick={() => p.input.onChange(!p.input.checked)}
    indeterminate={p.input.value === ''}
    {...p}
  />
);

export default BoolCheckbox;
