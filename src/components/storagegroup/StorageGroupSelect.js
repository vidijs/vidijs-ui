import React from 'react';
import { Field } from 'redux-form';

import { storage as api } from '@vidispine/vdt-api';
import Select from '../ui/Select';

export const loadStorageGroupOptions = (inputValue) => new Promise((resolve, reject) => {
  api.listStorage()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { group: groupList = [] } = jsonDocument;
      let filterFields = groupList.map((s) => s.name);
      if (inputValue && inputValue !== '*') filterFields = filterFields.filter((f) => f.toLowerCase().includes(inputValue.toLowerCase()));
      const options = filterFields.map((f) => ({ label: f, value: f }));
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

export default function StorageGroupSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      parse={parse}
      creatable={false}
      {...props}
    />
  );
}
