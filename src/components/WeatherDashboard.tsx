import React from "react";
import { WeatherResponse, ChartDataPoint, TableRow } from "../types/weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchWeatherData } from "../utils/api";
import { useState, useCallback, useMemo } from "react";
import {
  Activity,
  MapPin,
  Calendar,
  Thermometer,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Eye,
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
  // Process data for chart
  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!weatherData) return [];

    return weatherData.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString(),
      maxTemp: weatherData.daily.temperature_2m_max[index] ?? null,
      minTemp: weatherData.daily.temperature_2m_min[index] ?? null,
      meanTemp: weatherData.daily.temperature_2m_mean[index] ?? null,
      maxApparent: weatherData.daily.apparent_temperature_max[index] ?? null,
      minApparent: weatherData.daily.apparent_temperature_min[index] ?? null,
      meanApparent: weatherData.daily.apparent_temperature_mean[index] ?? null,
    }));
  }, [weatherData]);

  // Process data for table with pagination
  const tableData = useMemo<TableRow[]>(() => {
    if (!weatherData) return [];

    return weatherData.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString(),
      maxTemp: weatherData.daily.temperature_2m_max[index]?.toFixed(1) ?? "N/A",
      minTemp: weatherData.daily.temperature_2m_min[index]?.toFixed(1) ?? "N/A",
      meanTemp:
        weatherData.daily.temperature_2m_mean[index]?.toFixed(1) ?? "N/A",
      maxApparent:
        weatherData.daily.apparent_temperature_max[index]?.toFixed(1) ?? "N/A",
      minApparent:
        weatherData.daily.apparent_temperature_min[index]?.toFixed(1) ?? "N/A",
      meanApparent:
        weatherData.daily.apparent_temperature_mean[index]?.toFixed(1) ?? "N/A",
    }));
  }, [weatherData]);

  // Pagination calculations
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
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
        {/* Results Section */}
        {weatherData && (
          <div className="space-y-8">
            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" size={24} />
                Temperature Trends
              </h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      label={{
                        value: `Temperature (${weatherData.daily_units.temperature_2m_max})`,
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="maxTemp"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Max Temperature"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="minTemp"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Min Temperature"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="meanTemp"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Mean Temperature"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="maxApparent"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Max Apparent"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="minApparent"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Min Apparent"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="meanApparent"
                      stroke="#ec4899"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Mean Apparent"
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Eye className="text-blue-600" size={24} />
                    Data Table
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Rows per page:
                    </label>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Max Temp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Min Temp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Mean Temp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Max Apparent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Min Apparent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Mean Apparent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.maxTemp}°
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.minTemp}°
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.meanTemp}°
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.maxApparent}°
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.minApparent}°
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.meanApparent}°
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(startIndex + rowsPerPage, tableData.length)} of{" "}
                      {tableData.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-150"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum : number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-1 border rounded-md transition-colors duration-150 ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-150"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
