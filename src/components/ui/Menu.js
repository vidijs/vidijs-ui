import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export { MenuItem };
export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.state = {
      menuAnchor: null,
    };
  }

  openMenu({ currentTarget }) {
    this.setState({ menuAnchor: currentTarget });
  }

  closeMenu() {
    this.setState({ menuAnchor: null });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onClick: (...args) => {
            if (child.props.onClick) { child.props.onClick(...args); }
            this.closeMenu();
          },
        });
      } return child;
    });
  }

  render() {
    const { menuAnchor } = this.state;
    const { icon, children = [], iconProps = {} } = this.props;
    const wrappedChildren = this.renderChildren(children);
    return (
      <>
        { wrappedChildren.length === 0
          ? <div />
          : (
            <>
              <IconButton onClick={this.openMenu} {...iconProps}>
                {icon || <MoreVertIcon />}
              </IconButton>
              <MUIMenu
                id="simple-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={this.closeMenu}
              >
                { wrappedChildren }
              </MUIMenu>
            </>
          )}
      </>
    );
  }
}
