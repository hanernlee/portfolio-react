import React, { Component } from 'react';
import Radium from 'radium';
import { Switch, Link, Route } from 'react-router-dom';
import PostNew from '../content/postNew';
import WorkNew from '../content/workNew';
import ShowWork from '../content/showWork';
import ShowPost from '../content/showPost';

const styles = {
  base: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    position: 'absolute',
    transition: 'all 0.3s ease',
    left: '0',
    width:'70%',
    minHeight: 'calc(100vh - 60px)',
    overflowY: 'scroll',

    '@media (min-width: 720px)': {
      minHeight: 'calc(100vh - 80px)'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '50px',
    width: '100%',
    marginTop: '50px'
  },
  button: {
    padding: '16px 50px',
    margin: '0 10px',
    border: '1px solid rgb(184, 184, 184)',
    color: 'rgb(184, 184, 184)',
    transition: 'all 0.4s ease',

    ":hover": {
      backgroundColor: 'rgb(184,184,184)',
      color: 'white'
    }
  },
  selected: {
    backgroundColor: 'rgb(184,184,184)',
    color: 'white'
  },
  links: {
    textDecoration: 'none'
  },
  content: {
    marginTop: '50px',
    marginBottom: '50px',
    paddingLeft: '25px',
    paddingRight: '25px',

    '@media (min-width: 720px)': {
      paddingLeft: '40px',
      paddingRight: '40px'
    }
  }
}

class DisplayDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: true
    }
  }

  toggleButton = (type) => {
    if (type === "work") {
      this.setState({
        post: false
      });
    } else {
      this.setState({
        post: true
      });
    }
  }

  toggleType = (type) => {
    if (type === "work") {
      this.setState({
        post: false
      });
    } else {
      this.setState({
        post: true
      });
    }
  }

  render() {
    const type = this.state.post;
    if (type) {
      var highlightPost = styles.selected;
    } else {
      var highlightWork = styles.selected;
    }

    return (
      <div style={styles.base}>
        <div>
          <div style={styles.buttonContainer}>
            <Link style={styles.links} to="/dashboard/post/new">
              <div key="post" style={[styles.button, highlightPost]}
                onClick={() => {
                  this.toggleButton('post')
                }}>
                Post
              </div>
            </Link>
            <Link style={styles.links} to="/dashboard/work/new">
              <div key="work" style={[styles.button, highlightWork]}
                onClick={() => {
                  this.toggleButton('work')
                }}>
                Work
              </div>
            </Link>
          </div>
          <div style={styles.content}>
            <Switch>
              <Route path="/dashboard/post/new" render={(props) => (
                <PostNew toggleType={this.toggleType} {...props} />
              )} />
              <Route path="/dashboard/work/new" render={(props) => (
                <WorkNew toggleType={this.toggleType} {...props} />
              )} />
              <Route path="/dashboard/post/:id" render={(props) => (
                <ShowPost toggleType={this.toggleType} {...props} />
              )} />
              <Route path="/dashboard/work/:id" render={(props) => (
                <ShowWork toggleType={this.toggleType} {...props} />
              )} />
              <Route path="/dashboard/" render={(props) => (
                <PostNew toggleType={this.toggleType} {...props} />
              )} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(DisplayDashboard);
