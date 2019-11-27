import React,{useState, Component} from 'react';
import './App.css';
import SearchTable from "./searchTable";
import {Switch, Route} from "react-router-dom";
import DetailView from "./detailView";
import Favorites from "./favorits";

class App extends Component {

  render () {
      return (
          <Switch>
              <Route exact path="/" component={SearchTable} />
              <Route path="/detail/:id" component={DetailView}  />
              <Route path="/fav" component={Favorites}  />
          </Switch>
    )
  }
}

export default App;
