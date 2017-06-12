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
    padding: '11px',
    borderStyle: 'groove',
  },
  button: {
    marginTop: '20px',
    marginRight: '20px',
    width: '100px',
    padding: '10px',
    color: 'rgb(184, 184, 184)',
    backgroundColor: 'white',
    fontSize: '12px',
    transition: '0.4s ease all',
    cursor: 'pointer',

    ":hover": {
      backgroundColor: 'rgb(184, 184, 184)',
      color: 'white'
    }
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
    var randomKey = database.ref('/work').push().key;
    var storageRef = storage.ref(`work/${randomKey}-${file.name}`);
    var task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
        var percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({
          value: percentage
        });
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.setState({
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
    updates[`/work/${newPostKey}`] = project;

    database.ref().update(updates);
    this.props.history.push(`/dashboard/work/${newPostKey}`);
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
            <button key="upload" style={[styles.button, styles.normalBtn]} onClick={this.uploadImage}>{value > 0 && value < 100 ? (`${value}%`) : ('Upload')}</button>
          </div>
          <div style={styles.base}>
            <label>Demo</label>
            <input type="text" name="demo" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>GitHub</label>
            <input type="text" name="github" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button key="submit" style={styles.button} type="submit" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Radium(WorkNew);
