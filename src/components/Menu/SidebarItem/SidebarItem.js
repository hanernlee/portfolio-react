import React, { Component } from 'react';
import Radium from 'radium';
import { BrowserRouter as Link} from 'react-router-dom';
import Home from '../../Home/Home';

const styles = {
  base: {
    marginBottom: '24px',
    '@media (min-width: 720px)': {
      marginBottom: '36px'
    }
  },
  list: {
    textDecoration:'none',
    listStyleType: 'none',
    transition: 'opacity 0.3s',
    cursor: 'pointer',

    ':hover': {
      opacity: '0.6'
    }
  },
  title: {
    color: 'rgb(48, 48, 48)',
    fontWeight: '100',
    fontSize: '28px',
    letterSpacing: '0.5px'
  }
}

class SidebarItem extends Component {
  render() {
    return (
        <div style={styles.base}>
          <ul>
            <li style={styles.list}>
              <Link to={`{$this.props.url}`}>
                <span style={styles.title}>{this.props.name}</span>
              </Link>
             </li>
           </ul>
        </div>
    )
  }
}

export default Radium(SidebarItem);
