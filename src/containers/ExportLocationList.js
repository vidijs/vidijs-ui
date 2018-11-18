import React from 'react';

import ExportLocationListCard from '../components/exportlocation/ExportLocationListCard';
import ExportLocationDialog from '../components/exportlocation/ExportLocationDialog';
import ExportLocationListTitle from '../components/exportlocation/ExportLocationListTitle';

import withSnackbar from '../hoc/withSnackbar';
import { exportlocation as api } from '@vidijs/vidijs-api';

const EXPORTLOCATION_CREATE_MODAL = 'EXPORTLOCATION_CREATE_MODAL';

class ExportLocationList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      exportLocationListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Export Location';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listExportLocation()
        .then(response => this.setState({ exportLocationListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Export Location List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }


  render() {
    const { exportLocationListDocument } = this.state;
    return (
      <React.Fragment>
        <ExportLocationListTitle
          createModal={EXPORTLOCATION_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={exportLocationListDocument}
          codeModal="ExportLocationListDocument"
        />
        {exportLocationListDocument &&
        <ExportLocationListCard
          exportLocationListDocument={exportLocationListDocument}
          onRefresh={this.onRefresh}
        />
        }
        <ExportLocationDialog
          dialogName={EXPORTLOCATION_CREATE_MODAL}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(ExportLocationList);
