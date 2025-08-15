export interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature_2m_mean: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  apparent_temperature_mean: number[];
}

export interface WeatherResponse {
  daily: WeatherData;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    temperature_2m_mean: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    apparent_temperature_mean: string;
  };
}

export interface ChartDataPoint {
  date: string;
  maxTemp: number | null;
  minTemp: number | null;
  meanTemp: number | null;
  maxApparent: number | null;
  minApparent: number | null;
  meanApparent: number | null;
}

export interface TableRow {
  date: string;
  maxTemp: string;
  minTemp: string;
  meanTemp: string;
  maxApparent: string;
  minApparent: string;
  meanApparent: string;
}
