import React from 'react';
import { Field } from 'redux-form';

import Select from '../ui/Select';
import { fieldgroup as api } from '@vidijs/vidijs-api';


export const loadFieldGroupOptions = inputValue => new Promise((resolve, reject) => {
  api.listFieldGroup()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { group = [] } = jsonDocument;
      let filterFields = group;
      if (inputValue && inputValue !== '*') {
        filterFields = group.filter(f => f.name.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterFields.map(f => ({ label: f.name, value: f.name }));
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

export default function FieldGroupSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadFieldGroupOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
