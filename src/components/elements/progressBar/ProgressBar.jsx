import React from "react";
import DonutChart from "react-donut-chart";

function ProgressBar({ props = {} }) {
  // Check if `props` is empty
  if (!props || Object.keys(props).length === 0) {
    return (
      <div className="text-center text-gray-500">
        No language data available.
      </div>
    );
  }

  // Convert `props` object into an array
  const lan = Object.entries(props).map(([name, bytes]) => ({
    name,
    bytes,
  }));

  const total = lan.reduce((sum, obj) => sum + obj.bytes, 0);

  // Avoid division by zero
  if (total === 0) {
    return (
      <div className="text-center text-gray-500">
        No significant language usage data.
      </div>
    );
  }

  // Define default colors for common languages
  const languageColors = {
    JavaScript: "#f7df1e", // Yellow
    TypeScript: "#3178c6", // Blue
    Python: "#3776ab", // Blue
    Java: "#b07219", // Brownish Orange
    C: "#555555", // Dark Gray
    "C++": "#f34b7d", // Pink
    "C#": "#178600", // Green
    PHP: "#4F5D95", // Blue-Grey
    Swift: "#ffac45", // Light Orange
    Go: "#00ADD8", // Teal Blue
    Rust: "#dea584", // Rusty Orange
    Kotlin: "#A97BFF", // Purple
    Dart: "#00C4B3", // Cyan
    Ruby: "#cc342d", // Red
    R: "#276DC3", // Blue
    Shell: "#89e051", // Light Green
    HTML: "#e34c26", // Orange/Red
    CSS: "#563d7c", // Purple
    SCSS: "#c6538c", // Dark Pink
    SASS: "#cf649a", // Pink
    Lua: "#000080", // Navy Blue
    Perl: "#0298c3", // Blue
    Haskell: "#5e5086", // Purple
    Julia: "#9558b2", // Violet
    Elixir: "#6e4a7e", // Purple
    Vue: "#41B883", // Green
    React: "#61dafb", // Light Blue
    Angular: "#dd0031", // Red
    Svelte: "#ff3e00", // Bright Red
    Solidity: "#3c3c3d", // Dark Grey
    ObjectiveC: "#438eff", // Blue
    CoffeeScript: "#244776", // Dark Blue
    TeX: "#3D6117", // Olive Green
    YAML: "#cb171e", // Red
    JSON: "#3b3b3b", // Dark Gray
    GraphQL: "#e10098", // Pink
    Dockerfile: "#384d54", // Dark Blue-Gray
    Makefile: "#427819", // Green
  };
  

  // Function to generate a random color and store it for consistency
  const colorCache = {};
  const getRandomColor = (name) => {
    if (!colorCache[name]) {
      colorCache[name] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    return colorCache[name];
  };

  let values = lan.map((obj) => ({
    label: obj.name,
    value: Math.floor((obj.bytes / total) * 100), // Use Math.floor to remove decimals
    color: languageColors[obj.name] || getRandomColor(obj.name),
  }));

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
        Most Used Languages
      </h2>

      {/* Donut Chart */}
      <div className="flex justify-center w-full">
        <DonutChart
          data={values}
          height={140} // Responsive height
          width={140}  // Responsive width
          legend={false} // Hide default legend
        />
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {values.map((lang, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            ></span>
            <p className="font-medium">
              {lang.label}: <span className="font-semibold">{lang.value}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
