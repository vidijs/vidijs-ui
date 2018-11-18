const JobStates = [
  'READY',
  'STARTED',
  'VIDINET_JOB',
  'FINISHED',
  'FINISHED_WARNING',
  'FAILED_TOTAL',
  'WAITING',
  'ABORT_PENDING',
  'ABORTED',
];

export const OK_STATES = [
  'READY',
  'STARTED',
  'VIDINET_JOB',
  'FINISHED',
];

export const WARNING_STATES = [
  'WAITING',
  'FINISHED_WARNING',
  'ABORT_PENDING',
];

export const ERROR_STATES = [
  'FAILED_TOTAL',
  'ABORTED',
];

export const RUNNING_STATES = [
  'READY',
  'STARTED',
  'VIDINET_JOB',
  'WAITING',
  'ABORT_PENDING',
];

export const INACTIVE_STATES = [
  'FINISHED',
  'FINISHED_WARNING',
  'FAILED_TOTAL',
  'ABORTED',
];

export default JobStates;
