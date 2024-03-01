import React from "react";

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { date, min, max, code, isToday } = this.props;

    return <li className="day">
      <span>{code}</span>
      <p>{isToday ? "Today" : `${date}`}</p>
      <p>{min} &deg; &mdash;  <strong>{max}</strong> &deg;</p>
    </li>
  }
}

export default Day;