import React from 'react';

import UserTitle from '../components/user/UserTitle';
import UserCard from '../components/user/UserCard';
import UserGroupCard from '../components/user/UserGroupCard';
import UserPassword from '../components/user/UserPassword';
import UserToken from '../components/user/UserToken';
import UserRealName from '../components/user/UserRealName';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

import withUI from '../hoc/withUI';
import { user as api } from '@vidijs/vidijs-api';

const USER_PASSWORD_DIALOG = 'USER_PASSWORD_DIALOG';
const USER_TOKEN_DIALOG = 'USER_TOKEN_DIALOG';
const USER_REALNAME_DIALOG = 'USER_REALNAME_DIALOG';

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.onEnable = this.onEnable.bind(this);
    this.onDisable = this.onDisable.bind(this);
    this.state = {
      userDocument: undefined,
      userToken: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { userName } = this.props;
    document.title = `vidi.js | User | ${userName}`;
  }

  componentWillReceiveProps({ userName }) {
    const { userName: prevUserName } = this.props;
    if (prevUserName !== userName) {
      this.onFetch(userName);
      document.title = `vidi.js | User | ${userName}`;
    }
  }

  onRefresh() {
    const { userName } = this.props;
    this.onFetch(userName);
  }

  onFetch(userName) {
    try {
      api.getUser({ userName })
        .then(response => this.setState({ userDocument: response.data }))
        .catch(error => this.onFetchError(error));
    } catch (error) {
      this.onFetchError(error);
    }
  }

  onFetchError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onEnable() {
    const { userName, openSnackBar } = this.props;
    try {
      api.enableUser({ userName })
        .then(() => {
          const messageContent = 'User Enabled';
          openSnackBar({ messageContent });
          this.onRefresh();
        })
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onDisable() {
    const { userName, openSnackBar } = this.props;
    try {
      api.disableUser({ userName })
        .then(() => {
          const messageContent = 'User Disabled';
          openSnackBar({ messageContent });
          this.onRefresh();
        })
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const { userDocument, userToken } = this.state;
    const { userName } = this.props;
    return (
      <React.Fragment>
        <UserTitle
          onRefresh={this.onRefresh}
          code={userDocument}
          codeModal="UserDocument"
          userName={userName}
          passwordModal={USER_PASSWORD_DIALOG}
          realNameModal={USER_REALNAME_DIALOG}
          tokenModal={USER_TOKEN_DIALOG}
          onEnable={this.onEnable}
          onDisable={this.onDisable}
        />
        {userDocument && (
          <React.Fragment>
            <UserCard
              userDocument={userDocument}
            />
            <SimpleMetadataCard
              simpleMetadataDocument={userDocument.metadata}
              onSuccess={this.onRefresh}
              entityType="user"
              entityId={userName}
            />
            <UserGroupCard
              groupListDocument={userDocument.groupList}
              onSuccess={this.onRefresh}
              userName={userName}
            />
            <UserRealName
              dialogName={USER_REALNAME_DIALOG}
              onSuccess={this.onRefresh}
              userName={userName}
              realName={userDocument.realName}
            />
          </React.Fragment>
        )}
        <UserPassword
          dialogName={USER_PASSWORD_DIALOG}
          userName={userName}
        />
        <UserToken
          dialogName={USER_TOKEN_DIALOG}
          userName={userName}
          userToken={userToken}
          onSuccess={response => this.setState({ userToken: response.data })}
        />
      </React.Fragment>
    );
  }
}

export default withUI(User);
