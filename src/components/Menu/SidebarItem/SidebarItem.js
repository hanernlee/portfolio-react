import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';

const styles = {
  base: {
    marginBottom: '24px',
    '@media (min-width: 720px)': {
      marginBottom: '36px'
    }
  },
  list: {
    listStyleType: 'none',
    transition: 'opacity 0.3s',
    cursor: 'pointer',

    ':hover': {
      opacity: '0.6'
    }
  },
  links: {
    textDecoration:'none'
  },
  title: {
    color: 'rgb(48, 48, 48)',
    fontWeight: '100',
    fontSize: '28px',
    letterSpacing: '0.5px'
  }
}

class SidebarItem extends Component {
  itemClick = (e) => {
    this.props.itemClick();
    window.scrollTo(0, 0);
    if (e.target.dataset.id === "logout") {
      this.props.handleLogout();
    }
  }

  render() {
    return (
      <Link style={styles.links} to={`${this.props.url}`}>
        <div onClick={this.itemClick} style={styles.base}>
          <li onClick={this.itemClick} data-id={this.props.name} style={styles.list}>
            <span style={styles.title} data-id={this.props.name}>{this.props.name}</span>
          </li>
        </div>
      </Link>
    )
  }
}

export default Radium(SidebarItem);
