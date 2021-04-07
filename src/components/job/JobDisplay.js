import React from 'react';
import moment from 'moment';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import getJobDataVariant from '../../utils/getJobDataVariant';

const JobTaskProgressType = ({ value = {} }) => (
  <>
    <TextGrid
      title={value.total}
      value={value.unit}
      hideNoValue
      hover
    />
  </>
);

const JobTaskType = ({ value = {} }) => (
  <>
    <TextGrid
      title="step"
      value={value.step}
      hideNoValue
      hover
    />
    <TextGrid
      title="attempts"
      value={value.attempts}
      hideNoValue
      hover
    />
    <TextGrid
      title="status"
      value={value.status}
      hideNoValue
      hover
    />
    <TextGrid
      title="timestamp"
      value={value.timestamp}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid
      title="description"
      value={value.description}
      hideNoValue
      hover
    />
    <TypeSection
      component={JobTaskProgressType}
      value={value.progress}
      hideNoValue
    />
    <TypeArray
      value={value.subStep}
      component={({ value: v }) => (
        <TextGrid
          title={moment(v.timestamp).format('llll')}
          value={v.description}
          titleStartCase={false}
        />
      )}
      hideNoValue
      hover
      dense
    />
    <TextGrid
      title="errorMessage"
      value={value.errorMessage}
      hideNoValue
      hover
    />
    <TextGrid
      title="totalSubTasks"
      value={value.totalSubTasks}
      hideNoValue
      hover
    />
    <TypeArray
      title="subTask"
      value={value.subTask}
      component={JobTaskType}
      hideNoValue
      hover
    />
  </>
);

const DataSection = ({ value = {} }) => (
  <TypeArray
    arrayTitle="Data"
    value={value.data}
    component={({ value: v }) => (
      <TextGrid
        title={v.key}
        value={v.value}
        titleStartCase={false}
        variant={getJobDataVariant(v.key)}
      />
    )}
    hideNoValue
    hover
    dense
  />
);

const StepSection = ({ value = {} }) => (
  <TypeSection
    value={value.log}
    dense
    component={({ value: v }) => (
      <TypeArray
        arrayTitle="Step"
        titleKey="step"
        value={Array.isArray(v.task) ? v.task.reverse() : v.task}
        component={JobTaskType}
        hideNoValue
        hover
        dense
      />
    )}
  />
);

const CurrentSection = ({ value = {} }) => (
  <TypeSection
    title="currentStep"
    value={value.currentStep}
    component={({ value: v }) => (
      <>
        <TextGrid
          title="description"
          value={v.description}
          hideNoValue
          hover
        />
        <TextGrid
          title="number"
          value={v.number}
          hideNoValue
          hover
        />
        <TextGrid
          title="status"
          value={v.status}
          hideNoValue
          hover
        />
      </>
    )}
    hideNoValue
    dense
  />
);

const BasicSection = ({ value = {} }) => (
  <>
    <TextGrid
      title="jobId"
      value={value.jobId}
      hover
    />
    <TextGrid
      title="user"
      value={value.user}
      variant="username"
      hideNoValue
      hover
    />
    <TextGrid
      title="started"
      value={value.started}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid
      title="finished"
      value={value.finished}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid
      title="status"
      value={value.status}
      hideNoValue
      hover
    />
    <TextGrid
      title="type"
      value={value.type}
      variant="jobtype"
      hideNoValue
      hover
    />
    <TextGrid
      title="priority"
      value={value.priority}
      hideNoValue
      hover
    />
    <TextGrid
      title="totalSteps"
      value={value.totalSteps}
      hideNoValue
      hover
    />
    <TypeSection
      title="waiting"
      value={value.waiting}
      component={({ value: v }) => (
        <>
          <TextGrid
            title="resourceId"
            value={v.resourceId}
            hideNoValue
            hover
          />
          <TextGrid
            title="resourceType"
            value={v.resourceType}
            hideNoValue
            hover
          />
          <TextGrid
            title="requirement"
            value={v.requirement}
            hideNoValue
            hover
          />
        </>
      )}
      hideNoValue
      dense
    />
  </>
);

const JobType = ({ value = {} }) => (
  <>
    <TypeSection
      component={BasicSection}
      value={value}
    />
    <TypeSection
      component={CurrentSection}
      value={value}
    />
    <TypeSection
      component={DataSection}
      value={value}
    />
    <TypeSection
      component={StepSection}
      value={value}
    />
    <TypeArray
      title="subJob"
      value={value.subJob}
      component={JobType}
      hideNoValue
      hover
    />
  </>
);

export const JobBasicDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={BasicSection}
      value={jobDocument}
    />
  </>
);

export const JobDataDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={DataSection}
      value={jobDocument}
    />
  </>
);

export const JobStepDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={StepSection}
      value={jobDocument}
    />
  </>
);

export const JobCurrentDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={CurrentSection}
      value={jobDocument}
    />
  </>
);

export default function JobDisplay({
  jobDocument,
}) {
  return (
    <>
      <TypeSection
        component={JobType}
        value={jobDocument}
      />
    </>
  );
}
