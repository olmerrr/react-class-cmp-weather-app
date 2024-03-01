import './App.css';
import React from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";

// import Counter from "./components/Counter";


class App extends React.Component {
  // state
  state = {
    isLoading: false,
    location: "lisbon",
    displayLocation: "",
    weather: {}
  }
  handleLocation = (e) => this.setState({ location: e.target.value })

  fetchWeather = async (e) => {
    e.preventDefault();

    function convertToFlag(countryCode) {
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    }

    if ( !this.state.location ) return alert("Please input location");
    try {
      // 1) Getting location (geocoding)
      this.setState({ isLoading: true })
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      this.setState({ isLoading: true })

      const geoData = await geoRes.json();

      if ( !geoData.results ) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch ( err ) {
      console.error(err)
    } finally {
      this.setState({ isLoading: false })
    }
    // this.setState({ location: "" });
  }

  constructor(props) {
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
  };


  // fix in feat
  // componentDidMount() {
  //   this.fetchWeather()
  // }

  render() {
    return <>
      <h1>Classy weather</h1>
      <form onSubmit={this.fetchWeather} className="search-form">
        <Input location={this.state.location} handleLocation={this.handleLocation}/>
        <button className="search-btn mr-2">Get weather</button>
        {this.state.isLoading && <span className="loader">Loading...</span>}
      </form>

      {this.state.weather?.weathercode && <Weather weather={this.state.weather} location={this.state.location}/>}
      {/*<Counter/>*/}
    </>
  }
}

export default App;
