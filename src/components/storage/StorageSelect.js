import React from 'react';
import { Field } from 'redux-form';

import { storage as api } from '@vidispine/vdt-api';
import Select from '../ui/Select';

export const loadStorageOptions = (inputValue) => new Promise((resolve, reject) => {
  api.listStorage()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { storage: storageList = [] } = jsonDocument;
      let filterFields = storageList.map((s) => s.id);
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

export default function StorageSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadStorageOptions}
      cacheOptions
      parse={parse}
      creatable={false}
      {...props}
    />
  );
}
