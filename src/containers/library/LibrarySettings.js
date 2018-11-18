import React from 'react';
import LibrarySettingsCard from '../../components/library/LibrarySettingsCard';

import { library as api } from '@vidijs/vidijs-api';
import withSnackbar from '../../hoc/withSnackbar';


class LibrarySettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      librarySettingsDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps({ libraryId }) {
    const { libraryId: prevLibraryId } = this.props;
    if (prevLibraryId !== libraryId) {
      this.onFetch(libraryId);
      document.title = `vidi.js | Library | ${libraryId}`;
    }
  }

  onRefresh() {
    const { libraryId } = this.props;
    this.onFetch(libraryId);
  }

  onFetch(libraryId) {
    try {
      api.getLibrarySettings({ libraryId })
        .then(response => this.setState({ librarySettingsDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Library';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  render() {
    const {
      libraryId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { librarySettingsDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={librarySettingsDocument}
            codeModal="LibrarySettingsDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {librarySettingsDocument && (
          <LibrarySettingsCard
            libraryId={libraryId}
            librarySettingsDocument={librarySettingsDocument}
            onSuccess={this.onRefresh}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(LibrarySettings);
