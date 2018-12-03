import {WEATHER_ICON_BASE_URL} from '../Constants';
export const getWeatherIconUrl = (iconId) => {
    return `${WEATHER_ICON_BASE_URL}${iconId}.png`;
}