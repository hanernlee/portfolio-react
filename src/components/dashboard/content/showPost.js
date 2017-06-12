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
  },
  deleteBtn: {
    backgroundColor: '#b30000',
    borderColor: '#b30000',

    ":hover": {
      backgroundColor: '#e60000',
      borderColor: '#e60000'
    }
  }
}

class ShowPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      tags: '',
      content: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    database.ref('/post/' + id).once('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        tags: snapshot.val().tags,
        content: snapshot.val().content
      });
    });
    this.props.toggleType('post');
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    database.ref('/post/' + id).off();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    database.ref('/post/' + id).once('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        tags: snapshot.val().tags,
        content: snapshot.val().content
      });
    });
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
      [name]: value
     });
  }

  updateForm = (e) => {
    e.preventDefault();

    database.ref('/post/' + this.state.id)
      .update({
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content
      });
    database.ref('/post/' + this.state.id).off();
  }

  deleteWork = (e) => {
    e.preventDefault();

    database.ref('/post/' + this.state.id).remove();
    this.props.history.push('/dashboard/post/new');
  }

  render() {
    const project = this.state;

    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Title</label>
            <input type="text" name="title" value={project.title} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Tags</label>
            <input type="text" name="tags" value={project.tags} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Content</label>
            <textarea type="textarea" name="content" value={project.content} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button key="update" style={styles.button} type="submit" onClick={this.updateForm}>Update</button>
          <button key="delete" style={[styles.button, styles.deleteBtn]} onClick={this.deleteWork}>Delete</button>
        </form>
      </div>
    );
  }
}

export default Radium(ShowPost);
