import React, { Component } from 'react';
import Radium from 'radium';

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

class PostNew extends Component {
  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
       [name]: value
     });
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
        </form>
      </div>
    );
  }
}

export default Radium(PostNew);
