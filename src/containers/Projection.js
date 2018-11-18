import React from 'react';

import TitleHeader from '../components/ui/TitleHeader';
import ProjectionCard from '../components/projection/ProjectionCard';
import ProjectionRemove from '../components/projection/ProjectionRemove';

import { projection as api } from '@vidijs/vidijs-api';
import withSnackbar from '../hoc/withSnackbar';
import formatXML from '../utils/formatXML';

const PROJECTION_REMOVE_MODAL = 'PROJECTION_REMOVE_MODAL';

class Projection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      incomingProjectionDocument: '',
      outgoingProjectionDocument: '',
      isRefreshing: true,
    };
  }

  componentDidMount() {
    const { projectionId } = this.props;
    document.title = `vidi.js | Projection | ${projectionId}`;
    this.onRefresh();
  }

  onFetch() {
    const { projectionId } = this.props;
    try {
      Promise.all([
        api.getProjectionIncoming({ projectionId }).then(response => formatXML(response.text())),
        api.getProjectionOutgoing({ projectionId }).then(response => formatXML(response.text())),
      ])
        .then(([incomingProjectionDocument, outgoingProjectionDocument]) => {
          this.setState({
            incomingProjectionDocument,
            outgoingProjectionDocument,
            isRefreshing: false,
          });
        })
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true }, this.onFetch());
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Projection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  render() {
    const {
      projectionId,
      history,
    } = this.props;
    const {
      incomingProjectionDocument,
      outgoingProjectionDocument,
      isRefreshing,
    } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          title={projectionId}
          parentTitle="Projection"
          parentTo="/projection/"
          helpTo="/ref/metadata/projection.html"
          onRefresh={this.onRefresh}
          removeModal={PROJECTION_REMOVE_MODAL}
        />
        { !isRefreshing && (
          <ProjectionCard
            projectionId={projectionId}
            onRefresh={this.onRefresh}
            incomingProjectionDocument={incomingProjectionDocument}
            outgoingProjectionDocument={outgoingProjectionDocument}
          />
        )
        }
        <ProjectionRemove
          dialogName={PROJECTION_REMOVE_MODAL}
          projectionId={projectionId}
          onSuccess={() => history.push('/projection/')}
        />
      </React.Fragment>
    );
  }
}


export default withSnackbar(Projection);
