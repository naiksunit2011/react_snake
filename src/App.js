import React, { Component } from 'react';
import Board from './Board/Board.js';
import './App.css';

class App extends Component {

//test 
  render() {
    return (
      <div className="outter-wrapper">
        
        <div className="header">
          <span>Snake Game</span>
        </div>
        <div className="board">
          <Board/>
        </div>
        <div class="footer-wrapper">
          Made with <span role="img" aria-label="heart">❤️</span> in India <span role="img" aria-label="star">★</span> By Sunit Naik
        </div>
      </div>
    );
  }
}
export default App;