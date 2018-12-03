import React from 'react';
import {getWeatherIconUrl} from '../../utils/commonUtil';
import './WeatherCard.css';

const WeatherCard = ({date, tempMin, tempMax, humidity, weather, weatherIconId}) => {
    return (
        <div className="cardContainer">
            <span className="date">{date}</span>
            <img className="icon" src={getWeatherIconUrl(weatherIconId)} alt='Weather Icon'/>
            <div className="tempContainer">
                <span className="maxTemp">{tempMax}* / </span>
                <span className="minTemp">{tempMin}* </span>
            </div>
            <span className="attributes">Humidity: {humidity}</span>
            <span className="attributes">Weather: {weather}</span>
        </div>

    );
}

export default WeatherCard;
