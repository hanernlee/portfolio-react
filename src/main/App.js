import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../components/Home/Home';
import Work from '../components/Work/Work';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Navbar />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/work" component={Work}/>
              </Switch>
          </div>
        </BrowserRouter>
      </StyleRoot>
    )
  }
}

export default App;
