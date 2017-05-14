import React, { Component } from 'react';
import Radium from 'radium';
import SidebarItem from '../sidebarItem/SidebarItem';
import { firebaseAuth } from '../../../config/config';

const styles = {
  base: {
    margin: '0 auto',
    width: '40%',
    textAlign: 'center'
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  handleLogout = () => {
    firebaseAuth().signOut()
  }

  itemClick = () => {
    this.props.itemClick();
  }

  render() {
    const user = this.props.user;

    return (
      <div style={styles.base}>
        <SidebarItem itemClick={this.itemClick} name="home" url="/" />
        <SidebarItem itemClick={this.itemClick} name="work" url="/work" />
        <SidebarItem itemClick={this.itemClick} name="contact" url="/contact" />
        <SidebarItem itemClick={this.itemClick} name="login" url="/login" />
        {user ? <SidebarItem itemClick={this.itemClick} name="dashboard" url="/dashboard" />  : null}
        {user ? <SidebarItem handleLogout={this.handleLogout} itemClick={this.itemClick} name="logout" url="/" /> : null}
      </div>
    )
  }
}

export default Radium(Sidebar);
