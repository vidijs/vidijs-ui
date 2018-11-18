import React from 'react';
import { Field } from 'redux-form';

import Select from '../ui/Select';
import { taskdefinition as api } from '@vidijs/vidijs-api';


const loadOptions = inputValue => new Promise((resolve, reject) => {
  api.listJobType()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { uri = [] } = jsonDocument;
      let filterFields = uri;
      if (inputValue && inputValue !== '*') {
        filterFields = uri.filter(f => f.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterFields.map(f => ({ label: f, value: f }));
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


export default function JobTypeSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadOptions}
      cacheOptions
      parse={parse}
      creatable={false}
      {...props}
    />
  );
}
