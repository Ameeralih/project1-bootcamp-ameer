import React from "react";
import "./App.css";

class BoggleBoard extends React.Component {
  generateString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
      row1.push(this.generateString());
    }
    for (let i = 0; i < 4; i++) {
      row2.push(this.generateString());
    }
    for (let i = 0; i < 4; i++) {
      row3.push(this.generateString());
    }
    for (let i = 0; i < 4; i++) {
      row4.push(this.generateString());
    }
    return (
      <div className="board">
        <div className="row">{row1}</div>
        <div className="row">{row2}</div>
        <div className="row">{row3}</div>
        <div className="row">{row4}</div>
      </div>
    );
  }

  render() {
    return <div>{this.generateBoard()}</div>;
  }
}

class UserInput extends React.Component {
  render() {
    return (
      <form>
        <input type="text" />
      </form>
    );
  }
}

export class Game extends React.Component {
  render() {
    return (
      <div>
        <p>Boggle Board</p>
        <BoggleBoard />
        <UserInput />
      </div>
    );
  }
}
