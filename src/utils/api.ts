import { WeatherResponse } from '../types/weather';

export const fetchWeatherData = async (
  latitude: string,
  longitude: string,
  startDate: string,
  endDate: string
): Promise<WeatherResponse> => {
  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    start_date: startDate,
    end_date: endDate,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'apparent_temperature_mean'
    ].join(','),
    timezone: 'auto'
  });

  const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};