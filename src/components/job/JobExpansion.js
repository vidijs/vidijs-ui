import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import grey from '@material-ui/core/colors/grey';

import { job as api } from '@vidijs/vidijs-api';
import JobCard from './JobCard';

import withSnackbar from '../../hoc/withSnackbar';

function JobExpansion(WrappedComponent) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.onExpand = this.onExpand.bind(this);
      this.state = {
        expanded: false,
        jobDocument: undefined,
      };
    }

    onGet() {
      const { job } = this.props;
      const { jobId } = job;
      const queryParams = { metadata: true };
      try {
        api.getJob({ jobId, queryParams })
          .then((response) => response.json())
          .then((jobDocument) => this.setState({ jobDocument }));
      } catch (error) {
        const messageContent = 'Error Loading Job';
        this.props.openSnackBar({ messageContent, messageColor: 'secondary' });
      }
    }

    onExpand() {
      const { expanded: currentExpanded } = this.state;
      if (currentExpanded) {
        this.setState({ expanded: !currentExpanded });
        return;
      }

      const { job } = this.props;
      const { jobId } = job;
      const queryParams = { metadata: true };
      api.getJob({ jobId, queryParams })
        .then((response) => response.json())
        .then((jobDocument) => this.setState({ jobDocument, expanded: !currentExpanded }))
        .catch(() => {
          const messageContent = 'Error Loading Job';
          this.props.openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    }

    render() {
      return (
        <>
          <WrappedComponent
            onExpand={this.onExpand}
            expanded={this.state.expanded}
            {...this.props}
          />
          {this.state.expanded
            && (
            <TableRow component="div">
              { this.state.jobDocument
              && (
              <div style={{ width: '800%', backgroundColor: grey[100], padding: '10px' }}>
                <JobCard jobDocument={this.state.jobDocument} />
              </div>
              )}
            </TableRow>
            )}
        </>
      );
    }
  };
}

export default withSnackbar(JobExpansion);
