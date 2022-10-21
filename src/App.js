import React from "react";
import "./App.css";
import words from "an-array-of-english-words";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBoard(),
      guess: "",
      dictionary: require("an-array-of-english-words"),
      wordsGuessed: [],
      correctWordsGuessed: [],
      score: 0,
      gameStart: false,
      secondsToGameEnd: 180,
    };
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (this.state.secondsToGameEnd === 0) {
      clearInterval(this.timerID);
    }
    if (this.state.secondsToGameEnd > 0) {
      this.setState({
        secondsToGameEnd: this.state.secondsToGameEnd - 1,
      });
    }
  }
  // generateLetter() {
  //   const characters = "abcdefghijklmnopqrstuvwxyz";
  //   let result = "";
  //   const charactersLength = characters.length;
  //   result = characters.charAt(Math.floor(Math.random() * charactersLength));
  //   return result;
  // }

  generateRandomDieAndSide(dieCombination) {
    const diceLeft = dieCombination.length;
    let dieChosen = Math.floor(Math.random() * diceLeft);
    let sideChosen = Math.floor(Math.random() * 6);
    let letter = dieCombination[dieChosen][sideChosen];
    console.log(dieCombination[dieChosen]);
    dieCombination.splice(dieChosen, 1);
    return letter;
  }

  generateBoard() {
    let dieCombination = [
      ["A", "A", "E", "E", "G", "N"],
      ["E", "L", "R", "T", "T", "Y"],
      ["A", "O", "O", "T", "T", "W"],
      ["A", "B", "B", "J", "O", "O"],
      ["E", "H", "R", "T", "V", "W"],
      ["C", "I", "M", "O", "T", "U"],
      ["D", "I", "S", "T", "T", "Y"],
      ["E", "I", "O", "S", "S", "T"],
      ["D", "E", "L", "R", "V", "Y"],
      ["A", "C", "H", "O", "P", "S"],
      ["H", "I", "M", "N", "Q", "U"],
      ["E", "E", "I", "N", "S", "U"],
      ["E", "E", "G", "H", "N", "W"],
      ["A", "F", "F", "K", "P", "S"],
      ["H", "L", "N", "N", "R", "Z"],
      ["D", "E", "I", "L", "R", "X"],
    ];
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const row4 = [];
    console.log(dieCombination);
    for (let i = 0; i < 4; i++) {
      row1.push(this.generateRandomDieAndSide(dieCombination));
    }
    for (let i = 0; i < 4; i++) {
      row2.push(this.generateRandomDieAndSide(dieCombination));
    }
    for (let i = 0; i < 4; i++) {
      row3.push(this.generateRandomDieAndSide(dieCombination));
    }
    for (let i = 0; i < 4; i++) {
      row4.push(this.generateRandomDieAndSide(dieCombination));
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
    if (
      dictionary.includes(this.state.input.toLowerCase()) &&
      this.checkWord(this.state.board, this.state.input.toUpperCase()) &&
      !this.state.correctWordsGuessed.includes(this.state.input.toUpperCase())
    ) {
      this.setState({
        correctWordsGuessed: [
          ...this.state.correctWordsGuessed,
          this.state.input.toUpperCase(),
        ],
        score: this.state.score + this.state.input.length,
        input: "",
      });
    }
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  onChange = (input) => {
    this.setState({ input });
  };

  handleKeyboardSubmit() {
    const dictionary = this.state.dictionary;
    if (
      dictionary.includes(this.state.input.toLowerCase()) &&
      this.checkWord(this.state.board, this.state.input.toUpperCase()) &&
      !this.state.correctWordsGuessed.includes(this.state.input.toUpperCase())
    ) {
      this.setState({
        correctWordsGuessed: [
          ...this.state.correctWordsGuessed,
          this.state.input.toUpperCase(),
        ],
        score: this.state.score + this.state.input.length,
        input: "",
      });
      this.keyboard.clearInput();
    }
  }

  onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{enter}") this.handleKeyboardSubmit();
  };

  form() {
    const layout = {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{enter} z x c v b n m {backspace}",
      ],
    };
    if (this.state.secondsToGameEnd > 0) {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            autoFocus="autofocus"
            className="inputField"
            type="text"
            name="guess"
            value={this.state.input}
            onChange={(e) => this.handleChange(e)}
          />
          <Keyboard
            layoutName="default"
            layout={layout}
            keyboardRef={(r) => (this.keyboard = r)}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
          />
          <button className="enter-button">Enter</button>
        </form>
      );
    } else {
      return <p>Time's Up!</p>;
    }
  }

  correctWordsGuessed() {
    let wordsGuessedString = "";

    if (this.state.correctWordsGuessed.length === 1) {
      return this.state.correctWordsGuessed[0];
    }
    if (this.state.correctWordsGuessed.length > 1) {
      let i = 0;
      for (i = 0; i < this.state.correctWordsGuessed.length - 1; i++) {
        wordsGuessedString =
          wordsGuessedString + this.state.correctWordsGuessed[i] + ", ";
      }
      wordsGuessedString =
        wordsGuessedString + this.state.correctWordsGuessed[i];
      return wordsGuessedString;
    }
  }

  restart() {
    this.keyboard.clearInput();
    this.setState({
      secondsToGameEnd: 180,
      score: 0,
      input: "",
    });
  }
  render() {
    if (this.state.secondsToGameEnd > 0) {
      return (
        <div className="outerContainer">
          <div className="game-title">Word Search!</div>
          <div className="time-and-score">
            <div className="time">
              <div className="time-header">
                <b>Time Left</b>
              </div>
              <div className="time-seconds">{this.state.secondsToGameEnd}</div>
            </div>
            <div className="score">
              <div className="score-header">
                <b>Score</b>
              </div>
              <div className="score-points">{this.state.score}</div>
            </div>
          </div>

          <div className="board">{this.board()}</div>
          <div className="form">{this.form()}</div>
        </div>
      );
    } else {
      return (
        <div className="outerContainer">
          <div> Score: {this.state.score}</div>
          <button onClick={this.restart}>Play Again!</button>
        </div>
      );
    }
  }
}

export class Game extends React.Component {
  render() {
    return <App />;
  }
}
