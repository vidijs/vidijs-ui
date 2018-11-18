const EXCLUDE_FIELDS = [
  'user',
  'itemId',
];

function valueMap(thisValue) {
  const { value } = thisValue;
  return {
    value,
  };
}

function fieldReduce(fieldList, thisField) {
  const { name, value: valueList = [] } = thisField;
  if (name.startsWith('__')) { return fieldList; }
  if (EXCLUDE_FIELDS.includes(name)) { return fieldList; }
  const value = valueList.map(valueMap);
  fieldList.push({
    name,
    value,
  });
  return fieldList;
}

function groupMap(thisGroup) {
  const { name, field: fieldList = [], group: groupList = [] } = thisGroup;
  const field = fieldList.reduce(fieldReduce, []);
  const group = groupList.map(groupMap);
  return {
    name,
    field,
    group,
  };
}

function timespanMap(thisTimespan) {
  const {
    start,
    end,
    field: fieldList = [],
    group: groupList = [],
  } = thisTimespan;
  const field = fieldList.reduce(fieldReduce, []);
  const group = groupList.map(groupMap);
  return {
    start,
    end,
    field,
    group,
  };
}

function metadataDocumentToForm(metadataDocument) {
  if (metadataDocument === undefined) { return {}; }
  const { timespan: timespanList = [] } = metadataDocument;
  const timespan = timespanList.map(timespanMap);
  return {
    timespan,
  };
}

export default metadataDocumentToForm;
