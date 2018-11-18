import React from 'react';
import { Field } from 'redux-form';

import { StatefulAsyncSelect } from '../ui/Select';
import { group as api } from '@vidijs/vidijs-api';


export const loadGroupOptions = inputValue => new Promise((resolve, reject) => {
  api.listGroup()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { group = [] } = jsonDocument;
      let filterOps = group;
      if (inputValue && inputValue !== '*') {
        filterOps = group.filter(f => f.groupName.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterOps.map(f => ({ label: f.groupName, value: f.groupName }));
      resolve(options);
    })
    .catch((error) => {
      reject(error);
    });
});


const parse = (value) => {
  if (value) {
    return value.value;
  }
  return undefined;
};

export default function GroupSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
