import React from 'react';
import Grid from '@material-ui/core/Grid';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';

const TaskDefinitionDependency = ({ value = {} }) => (
  <>
    <TextGrid title="step" value={value.step} hover hideNoValue />
    <TextGrid title="previous" value={value.previous} hover variant="boolean" />
    <TextGrid title="allPrevious" value={value.allPrevious} hover variant="boolean" />
  </>
);

export default function TaskDefinitionDisplay({
  taskDefinitionDocument,
}) {
  return (
    <>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <TextGrid title="ID" value={taskDefinitionDocument.id} hover hideNoValue />
          <TextGrid title="Cleanup" value={taskDefinitionDocument.cleanup} hover variant="boolean" />
          <TextGrid title="Critical" value={taskDefinitionDocument.critical} hover variant="boolean" />
          <TextGrid title="Extra Data" value={taskDefinitionDocument.extradata} hover hideNoValue />
          <TextGrid title="Flags" value={taskDefinitionDocument.flags} hover hideNoValue />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextGrid title="Bean" value={taskDefinitionDocument.bean} hover hideNoValue />
          <TextGrid title="Method" value={taskDefinitionDocument.method} hover hideNoValue />
          <TextGrid title="Plugin" value={taskDefinitionDocument.plugin} hover variant="boolean" />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <TypeSection
            title="Dependency"
            component={TaskDefinitionDependency}
            value={taskDefinitionDocument.dependency}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TypeSection
            title="Parallel Dependency"
            component={TaskDefinitionDependency}
            value={taskDefinitionDocument.parallelDependency}
          />
        </Grid>
      </Grid>
      <TextGrid
        title="Script"
        value={taskDefinitionDocument.script}
        variant="code"
        codeProps={{
          mode: 'javascript',
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        }}
        hideNoValue
      />
    </>
  );
}
