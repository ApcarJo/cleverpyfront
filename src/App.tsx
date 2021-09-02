
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route path="/" exact component={Home} />

        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;
