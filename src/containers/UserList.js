import React from 'react';

import { user as api } from '@vidispine/vdt-api';
import UserListTitle from '../components/user/UserListTitle';
import UserListCard from '../components/user/UserListCard';
import UserWizard from '../components/user/UserWizard';

import withSnackbar from '../hoc/withSnackbar';

const USER_CREATE_MODAL = 'USER_CREATE_MODAL';

class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.state = {
      userListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | User';
  }

  onRefresh() {
    const { page, rowsPerPage: number } = this.state;
    const first = (number * page) + 1;
    const queryParams = { number, first };
    try {
      api.listUser({ queryParams })
        .then((response) => this.setState({ userListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User List';
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
      userListDocument,
      first,
      rowsPerPage,
      page,
    } = this.state;
    const { history } = this.props;
    return (
      <>
        <UserListTitle
          createModal={USER_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={userListDocument}
          codeModal="UserListDocument"
        />
        {userListDocument
        && (
        <UserListCard
          userListDocument={userListDocument}
          onRefresh={this.onRefresh}
          first={first}
          rowsPerPage={rowsPerPage}
          count={userListDocument.hits}
          onChangePage={this.onChangePage}
          page={page}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
        />
        )}
        <UserWizard
          dialogName={USER_CREATE_MODAL}
          onSuccess={(response) => history.push(`/user/${response.data.userName}`)}
        />
      </>
    );
  }
}

export default withSnackbar(UserList);
