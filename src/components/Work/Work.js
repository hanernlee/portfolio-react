import React, { Component } from 'react';
import Radium from 'radium';
import { database } from '../../config/config';
// import Card from './card/Card';

const styles = {
  base: {
    backgroundColor: 'red',
  }
}

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: null
    }
  }

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
        <div style={styles.base}> Code Stuff
          <div>
            {projects && Object.keys(projects).map((key, index) =>
              <div key={index}>
                <span>{projects[key].name}</span>
                <span>{projects[key].github}</span>
                <span>{projects[key].demo}</span>
              </div>
            )}
          </div>
        </div>
      );
  }
}

export default Radium(Work);
