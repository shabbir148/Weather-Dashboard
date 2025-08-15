# 🌤️ Weather Analytics Dashboard

A modern, responsive web application built with React and TypeScript for visualizing historical weather data. Features interactive charts, data tables with pagination, and a beautiful user interface powered by Tailwind CSS.


## 🎯 Live Demo

🔗 **[View Live Demo](https://weather-dashboard-nine-peach.vercel.app/)**

## ✨ Features

### 📊 Data Visualization
- **Interactive Line Charts** - Visualize temperature trends over time
- **Responsive Charts** - Optimized for all screen sizes
- **Multiple Variables** - Display 6 different temperature metrics simultaneously
- **Hover Tooltips** - Detailed data points on mouse interaction

### 📋 Data Management  
- **Paginated Data Table** - Navigate through large datasets easily
- **Flexible Row Display** - Choose between 10, 20, or 50 rows per page
- **Smart Pagination** - Intelligent page navigation with ellipsis
- **Data Export Ready** - Clean table structure for easy data extraction

### 🎨 User Experience
- **Modern UI Design** - Beautiful gradients and smooth animations
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Form Validation** - Real-time input validation with helpful error messages
- **Loading States** - Professional loading indicators during API calls
- **Error Handling** - Graceful error messages and recovery options

### 🔧 Technical Excellence
- **TypeScript** - Full type safety and better development experience
- **Performance Optimized** - Memoized components and efficient re-renders
- **API Integration** - Seamless integration with Open-Meteo Historical Weather API
- **Accessibility** - Semantic markup and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shabbir148/Weather-Prediction.git
cd weather-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "recharts": "^2.8.0",
  "lucide-react": "^0.263.1"
}
```

### Styling & UI
```json
{
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24"
}
```

## 🏗️ Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── WeatherDashboard.tsx    # Main dashboard component
│   ├── types/
│   │   └── weather.ts              # TypeScript interfaces
│   ├── utils/
│   │   └── api.ts                  # API utility functions
│   ├── App.tsx                     # Root component
│   ├── index.tsx                   # Entry point
│   └── index.css                   # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🌡️ Weather Data Variables

The dashboard displays the following historical weather metrics:

| Variable | Description | Unit |
|----------|-------------|------|
| **Maximum Temperature** | Daily maximum temperature at 2m height | °C |
| **Minimum Temperature** | Daily minimum temperature at 2m height | °C |
| **Mean Temperature** | Daily average temperature at 2m height | °C |
| **Maximum Apparent Temperature** | Daily maximum "feels like" temperature | °C |
| **Minimum Apparent Temperature** | Daily minimum "feels like" temperature | °C |
| **Mean Apparent Temperature** | Daily average "feels like" temperature | °C |

## 📊 Usage Guide

### 1. Enter Location Coordinates
- **Latitude**: Enter a value between -90 and 90
- **Longitude**: Enter a value between -180 and 180

### 2. Select Date Range
- **Start Date**: Choose your desired start date
- **End Date**: Choose your end date (cannot be in the future)

### 3. Fetch Weather Data
Click the "Fetch Weather Data" button to retrieve historical weather information.

### 4. Analyze Results
- **Chart View**: Examine temperature trends visually
- **Table View**: Browse detailed daily data with pagination

## 🌍 Sample Coordinates for Testing

| Location | Latitude | Longitude |
|----------|----------|-----------|
| **New York, USA** | 40.7128 | -74.0060 |
| **London, UK** | 51.5074 | -0.1278 |
| **Tokyo, Japan** | 35.6762 | 139.6503 |
| **Sydney, Australia** | -33.8688 | 151.2093 |
| **Paris, France** | 48.8566 | 2.3522 |
| **Mumbai, India** | 19.0760 | 72.8777 |

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```

4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**



## 🙏 Acknowledgments

- **[Open-Meteo](https://open-meteo.com/)** - Free weather API service
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

## 📊 API Information

This project uses the **Open-Meteo Historical Weather API**:
- **Endpoint**: `https://archive-api.open-meteo.com/v1/archive`


## 🔮 Future Enhancements

- [ ] **Export Functionality** - CSV/JSON data export
- [ ] **Location Search** - Geocoding API integration
- [ ] **Weather Maps** - Interactive map visualization
- [ ] **Data Comparison** - Compare multiple locations
- [ ] **Statistical Analysis** - Advanced analytics tools
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Offline Support** - PWA implementation
- [ ] **Weather Alerts** - Threshold-based notifications
