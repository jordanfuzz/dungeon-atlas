import React, { Component } from 'react';
import MapMaker from './components/MapMaker/MapMaker'
import ReactCursorPosition from 'react-cursor-position'
import router from './router'
import './App.css';

class App extends Component {

  handleButtonClick() {

  }

  render() {
    return (
      <div className="App">
          {router}
      </div>
    );
  }
}
 
export default App;
