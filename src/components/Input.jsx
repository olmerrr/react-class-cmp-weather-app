import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <> <input
      type="text"
      placeholder="Location"
      className="location mr-2"
      value={this.props.location}
      onChange={(e) => this.setState({ location: e.target.value })}
    />
    </>
  }
}

export default Input;