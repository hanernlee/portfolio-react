import React, { Component } from 'react';
import Radium from 'radium';
import { database } from '../../../config/config';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  input: {
    flex: '1',
    padding: '11px'
  }
}

class WorkNew extends Component {
  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
       [name]: value
     });
  }

  submitForm = (e) => {
    e.preventDefault();
    var newPostKey = database.ref().child('work').push().key;

    const project = {
      id: newPostKey,
      title: this.state.title,
      image: '',
      demo: this.state.demo,
      github: this.state.github
    }

    var updates = {};
    updates['/work/' + newPostKey] = project;

    return database.ref().update(updates);
  }

  render() {
    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Project</label>
            <input type="text" name="title" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Image</label>
            <input type="text" name="image" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Demo</label>
            <input type="text" name="demo" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>GitHub</label>
            <input type="text" name="github" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button type="submit" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Radium(WorkNew);
