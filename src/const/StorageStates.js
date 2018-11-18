const StorageStates = [
  'NONE',
  'READY',
  'OFFLINE',
  'FAILED',
  'DISABLED',
  'EVACUATING',
  'EVACUATED',
];

export const OK_STATES = [
  'NONE',
  'READY',
];

export const WARNING_STATES = [
  'EVACUATING',
  'EVACUATED',
  'DISABLED',
];

export const ERROR_STATES = [
  'OFFLINE',
  'FAILED',
];

export default StorageStates;
