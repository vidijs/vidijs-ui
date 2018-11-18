import React from 'react';

import GroupTitle from '../components/group/GroupTitle';
import GroupCard from '../components/group/GroupCard';
import GroupChildCard from '../components/group/GroupChildCard';
import GroupParentCard from '../components/group/GroupParentCard';
import GroupUserCard from '../components/group/GroupUserCard';
import GroupRemove from '../components/group/GroupRemove';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

import withUI from '../hoc/withUI';
import { group as api } from '@vidijs/vidijs-api';

const GROUP_REMOVE_DIALOG = 'GROUP_REMOVE_DIALOG';

class Group extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.state = {
      groupDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { groupName } = this.props;
    document.title = `vidi.js | Group | ${groupName}`;
  }

  componentWillReceiveProps({ groupName }) {
    const { groupName: prevGroupName } = this.props;
    if (prevGroupName !== groupName) {
      this.onFetch(groupName);
      document.title = `vidi.js | Group | ${groupName}`;
    }
  }

  onRefresh() {
    const { groupName } = this.props;
    this.onFetch(groupName);
  }

  onFetch(groupName) {
    try {
      api.getGroup({ groupName })
        .then(response => this.setState({ groupDocument: response.data }))
        .catch(error => this.onFetchError(error));
    } catch (error) {
      this.onFetchError(error);
    }
  }

  onFetchError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { groupDocument } = this.state;
    const { groupName, history } = this.props;
    return (
      <React.Fragment>
        <GroupTitle
          onRefresh={this.onRefresh}
          code={groupDocument}
          codeModal="GroupDocument"
          groupName={groupName}
          removeModal={GROUP_REMOVE_DIALOG}
        />
        {groupDocument && (
          <React.Fragment>
            <GroupCard
              groupDocument={groupDocument}
            />
            <GroupChildCard
              groupDocument={groupDocument}
              onSuccess={this.onRefresh}
              groupName={groupName}
            />
            <GroupParentCard
              groupDocument={groupDocument}
              onSuccess={this.onRefresh}
              groupName={groupName}
            />
            <GroupUserCard
              groupDocument={groupDocument}
              onSuccess={this.onRefresh}
              groupName={groupName}
            />
            <SimpleMetadataCard
              simpleMetadataDocument={groupDocument.metadata}
              onSuccess={this.onRefresh}
              entityType="group"
              entityId={groupName}
            />
          </React.Fragment>
        )}
        <GroupRemove
          dialogName={GROUP_REMOVE_DIALOG}
          groupName={groupName}
          onSuccess={() => history.push('/group/')}
        />
      </React.Fragment>
    );
  }
}

export default withUI(Group);
