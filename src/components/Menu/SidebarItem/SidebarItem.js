import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import Home from '../../Home/Home';

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
  itemClick = () => {
    this.props.itemClick();
  }

  render() {
    return (
        <div style={styles.base}>
          <li onClick={this.itemClick} style={styles.list}>
            <Link style={styles.links} to={`${this.props.url}`}>
              <span style={styles.title}>{this.props.name}</span>
            </Link>
          </li>
        </div>
    )
  }
}

export default Radium(SidebarItem);
