import logo from './logo.svg';
import './App.css';
import React from 'react'
import {inject, observer} from "mobx-react";
import ObservedStrongFactory from "./components/StrongFactory";

@inject('rootStore')@observer class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <div className="App">
          <ObservedStrongFactory rootStore={this.props.rootStore}/>
        </div>
    );
  }
}

export default App;
