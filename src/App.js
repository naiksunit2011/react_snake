import React, { Component } from 'react';
import Board from './Board/Board.js';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="outter-wrapper">
        
        <div className="header">
          <span>Snake Game</span>
        </div>
        <div className="board">
          <Board/>
        </div>
      </div>
    );
  }
}
export default App;