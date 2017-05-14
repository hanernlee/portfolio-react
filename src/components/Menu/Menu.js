import React, { Component } from 'react';
import Radium from 'radium';
import Sidebar from './sidebar/Sidebar';

const styles = {
  base: {
    paddingTop: '16vh',
    backgroundColor: 'rgb(255, 255, 255)',
    bottom: '0px',
    left: '100%',
    position: 'fixed',
    top: '0px',
    transition: 'transform 0.4s ease-in-out',
    width: '300px',
    zIndex: '1',

    '@media (min-width: 720px)': {
      width: '400px'
    }
  },
  hide: {
    transform: 'translate3d(0px, 0px, 0px)',
  },
  show: {
    transform: 'translate3d(-300px, 0px, 0px)',
    '@media (min-width: 720px)': {
      transform: 'translate3d(-400px, 0px, 0px)'
    }
  }
}

class Menu extends Component {
  itemClick = () => {
    this.props.onClick();
  }

  render() {
    const user = this.props.user;
    var menuStyle = this.props.showMenu ? styles.show : styles.hide;

    return (
      <div style={[styles.base, menuStyle]}>
        <Sidebar itemClick={this.itemClick} user={user}/>
      </div>
    );
  }
}

export default Radium(Menu);
