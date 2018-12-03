import {
    WEATHER_API_BASE_URL,
    HTTP_METHOD, APP_ID,
    GOOGLE_PLACE_AUTO_SUGGEST_API_BASE_URL,
    GOOGLE_API_KEY,
    CORS_ANYWHERE_API,
} from '../Constants';


export const makeFetchCall=async (url, method) => {
    const requestParams = {
        method: method
    };
    try{
        const response = await fetch(`${CORS_ANYWHERE_API}${url}`, requestParams);
        const responseBody = await response.json();
        return responseBody;
    }catch(error) {
        console.log(error);
    }
}

export const readWeatherData = async (place='London,us') => {
    const url = `${WEATHER_API_BASE_URL}?q=${place}&units=metric&appid=${APP_ID}`;
    const weatherData = await makeFetchCall(url, HTTP_METHOD.GET);
    return weatherData;
}

export const getSuggestions = async (value) => {
    const url = `${GOOGLE_PLACE_AUTO_SUGGEST_API_BASE_URL}?input=${value}&types=geocode&language=en&key=${GOOGLE_API_KEY}`;
    const suggestionData = await makeFetchCall(url, HTTP_METHOD.GET);
    return suggestionData;
}