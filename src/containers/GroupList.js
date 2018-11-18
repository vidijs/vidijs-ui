import React from 'react';

import GroupListTitle from '../components/group/GroupListTitle';
import GroupListCard from '../components/group/GroupListCard';
import GroupWizard from '../components/group/GroupWizard';

import withSnackbar from '../hoc/withSnackbar';
import { group as api } from '@vidijs/vidijs-api';

const GROUP_CREATE_MODAL = 'GROUP_CREATE_MODAL';

class GroupList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.state = {
      groupListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Group';
  }

  onRefresh() {
    const { page, rowsPerPage: number } = this.state;
    const first = (number * page) + 1;
    const queryParams = { number, first };
    try {
      api.listGroup({ queryParams })
        .then(response => this.setState({ groupListDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Group List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  async onChangeRowsPerPage({ target: { value: rowsPerPage } } = {}) {
    const first = 0;
    await this.setState({ first, rowsPerPage });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { rowsPerPage } = this.state;
    const first = (page * rowsPerPage) + 1;
    await this.setState({ first, page });
    this.onRefresh();
  }

  render() {
    const {
      groupListDocument,
      first,
      rowsPerPage,
      page,
    } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <GroupListTitle
          createModal={GROUP_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={groupListDocument}
          codeModal="GroupListDocument"
        />
        {groupListDocument &&
        <GroupListCard
          groupListDocument={groupListDocument}
          onRefresh={this.onRefresh}
          first={first}
          rowsPerPage={rowsPerPage}
          count={groupListDocument.hits}
          onChangePage={this.onChangePage}
          page={page}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
        />
        }
        <GroupWizard
          dialogName={GROUP_CREATE_MODAL}
          onSuccess={response => history.push(`/group/${response.data.groupName}`)}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(GroupList);
