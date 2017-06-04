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
    database.ref('/post/' + id).on('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        tags: snapshot.val().tags,
        content: snapshot.val().content
      });
    });
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    database.ref('/post/' + id).off();
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
          <button type="submit" onClick={this.updateForm}>Update</button>
        </form>
      </div>
    );
  }
}

export default Radium(ShowPost);
