import React, { Component } from 'react';
import Bang from '../Bang/Bang.js';
import './Board.css';

class Board extends Component {

    toggleFlag = 0
    isStart = false;
    size = 35;
    speed = 200;
    snakeLength = 10;
    foodId = "0_5";
    currentX = 0;
    currentY = 0;
    direction = "R";
    buttonName = "Start/Stop";
    gameOver = "";
    isInfinite = true;
    constructor(props) {
        super(props);
        this.state = {
            currentDarkPixel: [],
            showFireWork: ""
        };
        this.foodId = this.createFood();
    }

    renderBoard() {
        var board = [];
        for (var i = 0; i < this.size; i++) {
            var rows = [];
            for (var j = 0; j < this.size; j++) {
                var id = i + "_" + j;
                if (this.foodId === id) {
                    rows.push(<div id={id} key={id} className={'board-pixel dark-pixel'}></div>);
                } else {
                    var darkPixel = (this.state.currentDarkPixel.indexOf(id) >= 0) ? "dark-pixel" : "";
                    rows.push(<div id={id} key={id} className={'board-pixel ' + darkPixel}></div>);
                }
            }
            var rowId = "Row_" + i;
            board.push(<div id={rowId} key={rowId} className="board-row">{rows}</div>);
        }
        return board;
    }

    createSnake() {

        var id = this.currentX + "_" + this.currentY;
        if (this.state.currentDarkPixel.indexOf(id) >= 0) {
            this.endGame();
        }

        this.state.currentDarkPixel.push(id);
        if (this.foodId === id) {
            this.foodId = this.createFood();
            this.snakeLength = this.snakeLength + 1;
            this.increaseSpeed();
        }

        if (this.state.currentDarkPixel.length > this.snakeLength)
            this.state.currentDarkPixel.shift();

        var direction = this.direction;
        if (direction === "U") {
            this.currentX = this.currentX - 1;
            if (this.currentX < 0) {
                if (this.isInfinite)
                    this.currentX = this.size;
                else
                    this.endGame();
            }
        } else if (direction === "D") {
            this.currentX = this.currentX + 1;
            if (this.currentX > this.size) {
                if (this.isInfinite)
                    this.currentX = 0;
                else
                    this.endGame();
            }
        } else if (direction === "L") {
            this.currentY = this.currentY - 1;
            if (this.currentY < 0) {
                if (this.isInfinite)
                    this.currentY = this.size;
                else
                    this.endGame();
            }
        } else if (direction === "R") {
            this.currentY = this.currentY + 1;
            if (this.currentY > this.size) {
                if (this.isInfinite)
                    this.currentY = 0;
                else
                    this.endGame();
            }
        }
        this.setState({ currentDarkPixel: this.state.currentDarkPixel, showFireWork: this.state.showFireWork });
        if (this.isStart)
            this.interval = setTimeout(() => this.createSnake(), this.speed);
    }

    increaseSpeed() {
        if (this.speed === 100) {
            this.declareWinner();
        }
        this.speed = this.speed - 10;
    }

    createFood() {
        var foodX = Math.floor(Math.random() * this.size);
        var foodY = Math.floor(Math.random() * this.size);
        return foodX + "_" + foodY;
    }

    startSnake(e) {
        if (this.isStart) {
            this.isStart = false;
            clearInterval(this.interval);
        } else {
            this.isStart = true;
            this.interval = setTimeout(() => this.createSnake(), this.speed);
        }
    }

    endGame() {
        this.isStart = false;
        clearInterval(this.interval);
        this.gameOver = "Game over!!!";
    }

    declareWinner() {
        this.isStart = false;
        clearInterval(this.interval);
        this.gameOver = "Winner winner chicken dinner!!!";
        this.setState({ currentDarkPixel: [], showFireWork: "showFireWork" });
    }

    handleControl(e, thisRef) {
        if (e.keyCode === 37 && this.direction !== "R") {
            thisRef.direction = "L";
        } else if (e.keyCode === 38 && this.direction !== "D") {
            thisRef.direction = "U";
        } else if (e.keyCode === 39 && this.direction !== "L") {
            thisRef.direction = "R";
        } else if (e.keyCode === 40 && this.direction !== "U") {
            thisRef.direction = "D";
        } else if (e.keyCode === 13) {
            thisRef.startSnake(e);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            this.handleControl(e, this);
        });
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleControl);
    }

    render() {
        return (
            <div>
                <Bang showFireWork={this.state.showFireWork} />
                <div className="board-header-wrapper">
                    <span>Total Score : {this.snakeLength - 10}</span>
                </div>
                <div className="board-inner-wrapper">{this.renderBoard()}</div>
                <div className="board-control-wrapper">
                    <button id="startBtn" key="startBtn" onClick={(e) => this.startSnake(e)}>{this.buttonName}</button>
                </div>
                <div className="board-footer-wrapper">
                    <span>{this.gameOver}</span>
                </div>
            </div>
        );
    }
}

export default Board;