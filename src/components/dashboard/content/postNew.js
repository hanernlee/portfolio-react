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
  }
}

class PostNew extends Component {
  componentDidMount() {
    this.props.toggleType('post');
  }

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

    var newPostKey = database.ref('/post').push().key;

    const project = {
      id: newPostKey,
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content
    }

    var updates = {};
    updates['/post/' + newPostKey] = project;

    database.ref().update(updates);
    this.props.history.push('/dashboard/post/' + newPostKey);
  }

  render() {
    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Title</label>
            <input type="text" name="title" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Tags</label>
            <input type="text" name="tags" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Content</label>
            <textarea type="textarea" name="content" onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button style={styles.button} type="submit" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Radium(PostNew);
