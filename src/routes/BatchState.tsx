import React, { Component } from "react";

interface Props {}

interface State {
  count: number;
}

export default class extends Component<Props, State> {
  state = { count: 0 };
  handleCLick = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log("count", this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log("count", this.state.count);
    }, 0);
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleCLick}>+</button>
      </div>
    );
  }
}
