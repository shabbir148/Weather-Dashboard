import React from "react";
import { WeatherData, WeatherResponse, ChartDataPoint } from "../types/weather";
import { fetchWeatherData } from "../utils/api";
import { useState, useEffect, useCallback } from "react";
import { Activity } from "lucide-react";
const WeatherDashboard: React.FC = () => {
  // State management
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Validation functions
  const validateLatitude = (lat: string): boolean => {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
  };

  const validateLongitude = (lng: string): boolean => {
    const num = parseFloat(lng);
    return !isNaN(num) && num >= -180 && num <= 180;
  };

  const validateDateRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    return startDate <= endDate && endDate <= today;
  };
  const handleFetchWeather = useCallback(async () => {
    if (!validateLatitude(latitude)) {
      setError("Please enter a valid latitude (-90 to 90)");
      return;
    }

    if (!validateLongitude(longitude)) {
      setError("Please enter a valid longitude (-180 to 180)");
      return;
    }

    if (!validateDateRange(startDate, endDate)) {
      setError(
        "Please enter a valid date range (end date cannot be in the future)"
      );
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data: WeatherResponse = await fetchWeatherData(
        latitude,
        longitude,
        startDate,
        endDate
      );
      setWeatherData(data);
      setCurrentPage(1);
    } catch (err) {
      setError(
        `Failed to fetch weather data: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, startDate, endDate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Activity className="text-blue-600" size={40} />
            Weather Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Historical weather data visualization and analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
