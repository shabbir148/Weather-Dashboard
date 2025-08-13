import React from "react";
import { WeatherData, WeatherResponse, ChartDataPoint } from "../types/weather";
import { fetchWeatherData } from "../utils/api";
import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  MapPin,
  Calendar,
  Thermometer,
  AlertCircle,
} from "lucide-react";
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
  const today = new Date().toISOString().split("T")[0];

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
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Latitude Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} className="text-blue-600" />
                Latitude
              </label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g., 40.7128"
                step="any"
                min="-90"
                max="90"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500">Range: -90 to 90</p>
            </div>

            {/* Longitude Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} className="text-blue-600" />
                Longitude
              </label>
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g., -74.0060"
                step="any"
                min="-180"
                max="180"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500">Range: -180 to 180</p>
            </div>

            {/* Start Date Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar size={16} className="text-green-600" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* End Date Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar size={16} className="text-green-600" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                max={today}
                min={startDate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Fetch Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleFetchWeather}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                <>
                  <Thermometer size={20} />
                  Fetch Weather Data
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
