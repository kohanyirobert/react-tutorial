import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button data-id={props.id} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        id={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          player: "X",
        },
      ],
      step: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[this.state.step];
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    const next = {
      squares: current.squares.slice(),
      player: current.player === "X" ? "O" : "X",
    };
    next.squares[i] = current.player;
    this.setState({
      history: [...history, next],
      step: this.state.step + 1,
    });
  }

  handleTimeTravel(step) {
    this.setState({
      step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    const winner = calculateWinner(current.squares);
    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${current.player}`;

    const buttonList = history.map((_, step) => (
      <li key={step}>
        <button onClick={() => this.handleTimeTravel(step)}>
          {step ? `Go to step ${step}` : "Go to start"}
        </button>
      </li>
    ));

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{buttonList}</ul>
        </div>
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<Game />, root);
