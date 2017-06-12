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
    borderStyle: 'groove'
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

class ShowWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      image: '',
      demo: '',
      github: '',
      file: '',
      value: 0
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    database.ref('/work/' + id).once('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        image: snapshot.val().image,
        demo: snapshot.val().demo,
        github: snapshot.val().github
      });
    });
    this.props.toggleType('work');
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    database.ref('/work/' + id).off();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    database.ref('/work/' + id).once('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        image: snapshot.val().image,
        demo: snapshot.val().demo,
        github: snapshot.val().github
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

  updateForm = (e) => {
    e.preventDefault();

    database.ref('/work/' + this.state.id)
      .update({
        title: this.state.title,
        image: this.state.image,
        demo: this.state.demo,
        github: this.state.github
      });
    database.ref('/work/' + this.state.id).off();
  }

  deleteWork = (e) => {
    e.preventDefault();

    database.ref('/work/' + this.state.id).remove();
    this.props.history.push('/dashboard/work/new');
  }

  render() {
    const project = this.state;
    const value = this.state.value;
    const bgImage =  {
      backgroundImage: `url(${project.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0px 0px',
      height: '250px',
      width: '100%',
      margin: '20px auto'
    }

    if (!project.title) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Project</label>
            <input type="text" name="title" value={project.title} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Replace Image</label>
            {project.image ? (<div style={bgImage}></div>) : (<div>Loading...</div>)}
            <input type="file" name="image" onChange={this.handleFileUpload} style={styles.input} />
            <progress value={value} max="100"></progress>
            <button key="upload" style={[styles.button, styles.normalBtn]} onClick={this.uploadImage}>{value > 0 && value < 100 ? (`${value}%`) : ('Upload')}</button>
          </div>
          <div style={styles.base}>
            <label>Demo</label>
            <input type="text" name="demo" value={project.demo} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>GitHub</label>
            <input type="text" name="github" value={project.github} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button key="update" style={[styles.button, styles.normalBtn]} onClick={this.updateForm}>Update</button>
          <button style={[styles.button, styles.deleteBtn]} onClick={this.deleteWork}>Delete</button>
        </form>
      </div>
    );
  }
}

export default Radium(ShowWork);
