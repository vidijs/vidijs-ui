import React from 'react';
import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';


const VidispineServiceType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="id"
      value={value.id}
      hover
      hideNoValue
    />
    <TextGrid
      title="name"
      value={value.name}
      hover
      hideNoValue
    />
    <TextGrid
      title="class"
      value={value.class}
      hover
      hideNoValue
    />
    <TextGrid
      title="arguments"
      value={value.arguments}
      hover
      hideNoValue
    />
    <TextGrid
      title="isEnabled"
      value={value.isEnabled}
      variant="boolean"
      hover
      hideNoValue
    />
    <TextGrid
      title="isRunning"
      value={value.isRunning}
      variant="boolean"
      hover
      hideNoValue
    />
    <TextGrid
      title="exception"
      value={value.exception}
      variant="code"
      hover
      hideNoValue
    />
    <TextGrid
      title="exceptionTimestamp"
      value={value.exceptionTimestamp}
      variant="timestamp"
      hover
      hideNoValue
    />
    <TextGrid
      title="thread"
      value={value.thread}
      hover
      hideNoValue
    />
    <TextGrid
      title="threadStatus"
      value={value.threadStatus}
      hover
      hideNoValue
    />
    <TextGrid
      title="load5"
      value={value.load5}
      hover
      hideNoValue
    />
    <TextGrid
      title="load60"
      value={value.load60}
      hover
      hideNoValue
    />
  </React.Fragment>
);


export default function ServiceDisplay({
  vidispineServiceDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={VidispineServiceType}
        value={vidispineServiceDocument}
      />
    </React.Fragment>
  );
}
