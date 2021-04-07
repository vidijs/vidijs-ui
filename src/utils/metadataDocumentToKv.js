function fieldValueToList(valueList) {
  const output = [];
  output.getFirstValue = () => {
    if (this.length === 0) { return undefined; }
    return this[0];
  };

  if (valueList === undefined) { return output; }
  valueList.forEach((thisValue) => output.push(thisValue.value));
  return output;
}

function fieldToKv(fieldList) {
  const output = {};
  if (fieldList === undefined) { return output; }
  fieldList.forEach((thisField) => {
    const { name } = thisField;
    const { value: valueList } = thisField;
    const value = fieldValueToList(valueList);
    if (output[name]) {
      const currentValue = output[name];
      output[name] = currentValue.concat(value);
    } else {
      output[name] = value;
    }
  });
  return output;
}

function groupToKv(groupList) {
  const output = {};
  if (groupList === undefined) { return output; }
  groupList.forEach((thisGroup) => {
    const { name } = thisGroup;
    const field = fieldToKv(thisGroup.field);
    const group = groupToKv(thisGroup.group);
    if (output[name]) {
      const currentField = output[name].field;
      const currentGroup = output[name].group;
      output[name] = {
        name,
        field: Object.assign(currentField, field),
        group: Object.assign(currentGroup, group),
      };
    } else {
      output[name] = {
        name,
        field,
        group,
      };
    }
  });
  return output;
}

function timespanToKv(timespanList) {
  const output = {};
  if (timespanList === undefined) { return output; }
  timespanList.forEach((thisTimespan) => {
    const { start, end } = thisTimespan;
    const key = `${start}_${end}`;
    const field = fieldToKv(thisTimespan.field);
    const group = groupToKv(thisTimespan.group);
    output[key] = {
      start,
      end,
      field,
      group,
    };
  });
  return output;
}

export function metadataDocumentToKv(metadataDocument) {
  const output = {};
  if (metadataDocument === undefined) { return output; }
  const timespan = timespanToKv(metadataDocument.timespan);
  return {
    timespan,
  };
}

export default metadataDocumentToKv;
