import React, { Component } from 'react';
import Radium from 'radium';
import { database } from '../../../config/config';

const styles = {
  base: {
    display: 'flex',
    flex: '1 1 auto',
    width:'30%',
    minHeight: 'calc(100vh - 60px)',
    borderLeft: '1px solid rgb(246, 246, 246)',
    transition: 'all 0.3s ease',
    position: 'absolute',
    right: '0',
    overflowY: 'scroll',

    '@media (min-width: 720px)': {
      minHeight: 'calc(100vh - 80px)'
    }
  },
  list: {
    margin: '0 auto',
    width: '90%',
    textAlign: 'center',
    position: 'relative'
  },
  postTitle: {
    position: 'absolute',
    top:'30%',
    left:'50%',
    transform: 'translateX(-50%)'
  }
}

class DisplayMenu extends Component {
  componentDidMount() {
    database.ref('work/').on('value', snapshot => {
      this.setState({
        projects: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    database.ref('work/').off();
  }

  render() {
    const projects = this.state.projects;

    return (
      <div style={styles.base}>
        <div style={styles.list}>
          <div style={styles.postTitle}>
            {projects && Object.keys(projects).map((key, index) =>
              <div key={index}>
                <span>{projects[key].name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(DisplayMenu);
