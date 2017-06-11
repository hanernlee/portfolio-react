import React, { Component } from 'react';
import Radium from 'radium';
import { database, storage } from '../../../config/config';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  input: {
    flex: '1',
    padding: '11px'
  },
}

class WorkNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      image: '',
      value: 0
    }
  }

  componentDidMount() {
    this.props.toggleType('work');
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
       [name]: value
     });
  }

  handleFileUpload = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  uploadImage = (e) => {
    e.preventDefault();

    const file = this.state.file;
    var storageRef = storage.ref('work/' + file.name);

    var task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          value: percentage,
          image: task.snapshot.downloadURL
        });
      }
    )
  }

  submitForm = (e) => {
    e.preventDefault();
    var newPostKey = database.ref('/work').push().key;

    const project = {
      id: newPostKey,
      title: this.state.title,
      image: this.state.image,
      demo: this.state.demo,
      github: this.state.github
    }

    var updates = {};
    updates['/work/' + newPostKey] = project;

    return database.ref().update(updates);
  }

  render() {
    const value = this.state.value;

    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Project</label>
            <input type="text" name="title" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Image</label>
            <input type="file" name="image" onChange={this.handleFileUpload} style={styles.input} />
            <progress value={value} max="100"></progress>
            <button onClick={this.uploadImage}>Upload</button>
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
