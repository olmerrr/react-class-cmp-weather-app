import React from "react";


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
  };

  handleDecrement = () => {
    this.setState(curState => {
      return { count: curState.count - 1 }
    })
  }

  handleIncrement = () => {
    this.setState(curState => {
      return { count: curState.count + 1 }
    })
  }

  render() {
    return <>
      <h2>{this.state.count}</h2>
      <button className="btn mr-2" onClick={this.handleDecrement}>-</button>
      <button className="btn" onClick={this.handleIncrement}>+</button>
    </>
  }
}

export default Counter;
