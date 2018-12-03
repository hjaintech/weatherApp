import React, { Component } from 'react';
import WeatherCard from './components/WeatherCard';
import AutoSuggest from './components/AutoSuggest';
import {readWeatherData} from './utils/networkUtil';
import BeatLoader from 'react-spinners/BeatLoader';

import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      weatherData : [],
      showWeather: false,
      showBusyIndicator : false,
      showErrorMessage: false
    };
  }

  _parseWeatherData = ({list = []}) => {
    const fiveDayWeather = [];
    for(let i = 0 ; i < list.length ; i += 8){
      const data = list[i];
      fiveDayWeather.push({
        date: data.dt_txt.slice(0,10),
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
        weatherIconId: data.weather[0].icon
      });
    }
    return fiveDayWeather;
  }
  
  onCitySelect = (address) => {
    this.setState({
      showBusyIndicator: true,
      showWeather: false,
      showErrorMessage: false
    }, () => {
      readWeatherData(address.split(',')[0]).then((data) => {
        this.setState({
          weatherData : this._parseWeatherData(data),
          showWeather: true,
          showBusyIndicator: false,
          showErrorMessage: data.cod === "404"
        });
      });
    });
    
  }

  autoSuggestInputChanged = () => {
    this.setState({
      weatherData : [],
      showWeather: false,
      showBusyIndicator : false,
      showErrorMessage: false
    });
  }

  render() {
    return (
      <div className="appContainer">
        <div className="headingContainer">
          <span className="heading">Weather Forecast App</span>
        </div>
        <AutoSuggest 
          citySelect={this.onCitySelect}
          inputChanged={this.autoSuggestInputChanged}/>
       
        <div className="weatherCardContainer">
          {this.state.showWeather && this.state.weatherData.map((item) => (
            <WeatherCard
              key = {item.date}
              date = {item.date}
              tempMin= {item.tempMin}
              tempMax={item.tempMax}
              humidity={item.humidity}
              weather={item.weather}
              weatherIconId={item.weatherIconId}
            />
          ))}
          {this.state.showBusyIndicator && 
          <div className="loaderContainer">
            <BeatLoader
              sizeUnit={"px"}
              size={10}
              color={'#123abc'}
              loading={true}
            />
          </div>}

          {this.state.showErrorMessage && <div>No Data for this city found!</div>}
        </div>
      </div>
      
    );
  }
}

export default App;
