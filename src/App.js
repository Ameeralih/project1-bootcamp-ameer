import React from "react";
import "./App.css";
import words from "an-array-of-english-words";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBoard(),
      guess: "",
      dictionary: require("an-array-of-english-words"),
      wordInOrNotMessage: "",
      wordsGuessed: [],
      correctWordsGuessed: [],
      score: 0,
      gameStart: false,
      secondsToGameEnd: 180,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      secondsToGameEnd: this.state.secondsToGameEnd - 1,
    });
  }
  generateLetter() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  }
  generateBoard() {
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const row4 = [];

    for (let i = 0; i < 4; i++) {
      row1.push(this.generateLetter());
    }
    for (let i = 0; i < 4; i++) {
      row2.push(this.generateLetter());
    }
    for (let i = 0; i < 4; i++) {
      row3.push(this.generateLetter());
    }
    for (let i = 0; i < 4; i++) {
      row4.push(this.generateLetter());
    }
    const board = [row1, row2, row3, row4];
    return board;
  }

  checkWord = (board = [], guess = "") => {
    const numRows = board.length;
    const numCols = board[0].length;
    let queue = board.reduce((acc, row, i) => {
      row.forEach((x, j) => {
        if (x === guess[0]) {
          acc.push({
            pos: { r: i, c: j },
            nextIndex: 1,
            path: [numCols * i + j],
          });
        }
      });
      return acc;
    }, []);
    let exploreWord = (obj, queue) => {
      let allMoves = [
        { r: obj.pos.r - 1, c: obj.pos.c },
        { r: obj.pos.r + 1, c: obj.pos.c },
        { r: obj.pos.r, c: obj.pos.c - 1 },
        { r: obj.pos.r, c: obj.pos.c + 1 },
        { r: obj.pos.r - 1, c: obj.pos.c - 1 },
        { r: obj.pos.r - 1, c: obj.pos.c + 1 },
        { r: obj.pos.r + 1, c: obj.pos.c - 1 },
        { r: obj.pos.r + 1, c: obj.pos.c + 1 },
      ];
      allMoves.forEach((o) => {
        let index = numCols * o.r + o.c;
        if (o.r >= 0 && o.r < numRows && o.c >= 0 && o.c < numCols) {
          if (
            board[o.r][o.c] === guess[obj.nextIndex] &&
            !obj.path.includes(index)
          ) {
            let cloneObj = JSON.parse(JSON.stringify(obj));
            cloneObj.pos = { r: o.r, c: o.c };
            cloneObj.nextIndex += 1;
            cloneObj.path.push(index);
            queue.push(cloneObj);
          }
        }
      });
    };
    while (queue.length > 0) {
      let obj = queue.shift();
      if (obj.nextIndex === guess.length) {
        return true;
      }
      exploreWord(obj, queue);
    }
    return false;
  };

  board() {
    const boardArray = this.state.board;

    return (
      <div>
        <div>
          <div className="cell">{boardArray[0][0]}</div>
          <div className="cell">{boardArray[0][1]}</div>
          <div className="cell">{boardArray[0][2]}</div>
          <div className="cell">{boardArray[0][3]}</div>
        </div>
        <div>
          <div className="cell">{boardArray[1][0]}</div>
          <div className="cell">{boardArray[1][1]}</div>
          <div className="cell">{boardArray[1][2]}</div>
          <div className="cell">{boardArray[1][3]}</div>
        </div>
        <div>
          <div className="cell">{boardArray[2][0]}</div>
          <div className="cell">{boardArray[2][1]}</div>
          <div className="cell">{boardArray[2][2]}</div>
          <div className="cell">{boardArray[2][3]}</div>
        </div>
        <div>
          <div className="cell">{boardArray[3][0]}</div>
          <div className="cell">{boardArray[3][1]}</div>
          <div className="cell">{boardArray[3][2]}</div>
          <div className="cell">{boardArray[3][3]}</div>
        </div>
      </div>
    );
  }

  handleSubmit(e) {
    const dictionary = this.state.dictionary;
    e.preventDefault();
    console.log(this.state.guess);
    console.log(dictionary.includes(this.state.guess));
    console.log(this.checkWord(this.state.board, this.state.guess));
    if (
      dictionary.includes(this.state.guess) &&
      this.checkWord(this.state.board, this.state.guess)
    ) {
      console.log("yes");
      this.setState({
        wordInOrNotMessage: "Yes!",
        correctWordsGuessed: [
          ...this.state.correctWordsGuessed,
          this.state.guess,
        ],
      });
    } else {
      console.log("no");
      this.setState({
        wordInOrNotMessage: "No!",
      });
    }
  }

  handleChange(e) {
    this.setState({
      guess: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="board">
          {this.board()}
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input
              type="text"
              name="guess"
              value={this.state.guess}
              onChange={(e) => this.handleChange(e)}
            />
            <button>Enter</button>
          </form>
        </div>
        <p>Time Left: {this.state.secondsToGameEnd} seconds</p>
        <div className="correctWords">
          <p>
            <b>Correct Words</b>
          </p>

          <p>{this.state.correctWordsGuessed}</p>
        </div>
      </div>
    );
  }
}

export class Game extends React.Component {
  render() {
    return (
      <div className="App-header">
        <p>Boggle Board</p>
        <App />
      </div>
    );
  }
}
