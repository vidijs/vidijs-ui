import React from 'react';
import update from 'immutability-helper';

import { exportlocation as api } from '@vidispine/vdt-api';

import ExportLocationTitle from '../components/exportlocation/ExportLocationTitle';
import ExportLocationCard from '../components/exportlocation/ExportLocationCard';
import ExportLocationRemove from '../components/exportlocation/ExportLocationRemove';

import withSnackbar from '../hoc/withSnackbar';

const EXPORTLOCATION_REMOVE_MODAL = 'EXPORTLOCATION_REMOVE_MODAL';

class ExportLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      exportLocationDocument: undefined,
    };
  }

  componentDidMount() {
    const { locationName } = this.props;
    document.title = `xray | Export Location | ${locationName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, locationName } = this.props;
    try {
      api.getExportLocation({ locationName })
        .then((response) => this.setState({
          exportLocationDocument: update(response.data, { $unset: ['uri'] }),
        }));
    } catch (error) {
      const messageContent = 'Error Getting Export Location';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      locationName,
    } = this.props;
    const { exportLocationDocument } = this.state;
    return (
      <>
        <ExportLocationTitle
          removeModal={EXPORTLOCATION_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          locationName={locationName}
          code={exportLocationDocument}
          codeModal="ExportLocationDocument"
        />
        {exportLocationDocument
        && (
        <ExportLocationCard
          exportLocationDocument={exportLocationDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <ExportLocationRemove
          dialogName={EXPORTLOCATION_REMOVE_MODAL}
          locationName={locationName}
        />
      </>
    );
  }
}

export default withSnackbar(ExportLocation);
