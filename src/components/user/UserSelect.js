import React from 'react';
import { Field } from 'redux-form';

import { StatefulAsyncSelect } from '../ui/Select';
import { user as api } from '@vidijs/vidijs-api';


export const loadUserOptions = inputValue => new Promise((resolve, reject) => {
  api.listUser()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { user = [] } = jsonDocument;
      let filterOps = user;
      if (inputValue && inputValue !== '*') {
        filterOps = user.filter(f => f.userName.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterOps.map(f => ({ label: f.userName, value: f.userName }));
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

export default function UserSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      parse={parse}
      createable={false}
      {...props}
    />
  );
}
