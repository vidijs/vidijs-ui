import React from 'react';

import ReindexCard from '../components/reindex/ReindexCard';

import TitleHeader from '../components/ui/TitleHeader';
import withSnackbar from '../hoc/withSnackbar';
import { reindex as api } from '@vidijs/vidijs-api';
import { RUNNING_STATES } from '../const/ReindexStates';

const INDEX_NAMES = [
  'item',
  'collection',
  'acl',
  'file',
  'thumbnail',
];

class ReindexList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAutoRefresh = this.onAutoRefresh.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      item: undefined,
      collection: undefined,
      acl: undefined,
      file: undefined,
      thumbnail: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Reindex';
    this.timer = setInterval(() => this.onAutoRefresh(), 2500);
    this.onRefresh();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  onRefresh() {
    INDEX_NAMES.forEach(indexName => this.onFetch(indexName));
  }

  onRefreshError(error, index) {
    const { openSnackBar } = this.props;
    const messageContent = `Error Loading ${index} Reindex Status`;
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onAutoRefresh() {
    const isRunning = INDEX_NAMES.find((indexName) => {
      const { [indexName]: reindexRequestDocument = {} } = this.state;
      const { status } = reindexRequestDocument;
      return (RUNNING_STATES.includes(status));
    });
    if (isRunning === undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
      return;
    }
    this.onRefresh();
  }


  onFetch(indexName) {
    try {
      api.getReindex({ indexName })
        .then(response => this.setState({ [indexName]: response.data }))
        .catch((error) => {
          if (!error.response) {
            this.onRefreshError(error);
            return;
          }
          if (error.response.status !== 404) {
            this.onRefreshError(error);
            return;
          }
          this.setState({ [indexName]: {} });
        });
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <TitleHeader
          title="Reindex"
          helpTo="/ref/metadata/reindex.html"
          onRefresh={this.onRefresh}
          code={this.state}
          codeModal="All reindexRequestDocument"
        />
        {
        INDEX_NAMES.map(indexName => (
          <ReindexCard
            key={indexName}
            indexName={indexName}
            // eslint-disable-next-line react/destructuring-assignment
            reindexRequestDocument={this.state[indexName]}
            onSuccess={() => {
              this.onFetch(indexName);
              if (this.timer === undefined) {
                this.timer = setInterval(() => this.onAutoRefresh(), 2500);
              }
            }}
          />
        ))
        }
      </React.Fragment>
    );
  }
}

export default withSnackbar(ReindexList);
