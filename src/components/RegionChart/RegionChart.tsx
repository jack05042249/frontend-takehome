import React, { useEffect, useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GetContinentsData } from "../../types/types";
import "./RegionChart.css";

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
      countries {
        languages {
          name
        }
      }
    }
  }
`;



interface RegionChartProps {
  onRegionClick: (continent: string | null) => void;
  selectedContinent: string | null;
}

/**
 * RegionChart Component
 *
 * - Displays a horizontal bar chart of languages spoken by continent.
 * - Clicking highlights the continent and filters the country table.
 * - Sorted from highest to lowest number of languages.
 */
export const RegionChart: React.FC<RegionChartProps> = ({ onRegionClick, selectedContinent }) => {
  const { loading, error, data } = useQuery<GetContinentsData>(GET_CONTINENTS);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth > 1200 ? 1200 : window.innerWidth);
  useEffect(() => {
    // Step 2: Define the event listener function
    const handleResize = () => {
      // Update the window width state when window resizes
      setWindowWidth(document.getElementById('region-chart')?.clientWidth ?? 0);
    };

    // Step 3: Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Step 4: Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const continents = useMemo(() => {
    if (!data) return [];
    return data.continents
      .map((continent) => ({
        name: continent.name,
        languageCount: continent.countries.reduce(
          (sum, country) => sum + country.languages.length,
          0
        ),
      }))
      .sort((a, b) => b.languageCount - a.languageCount);
  }, [data]);

  const handleClick = (continentName: string) => {
    onRegionClick(selectedContinent === continentName ? null : continentName);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="region-chart" id="region-chart">
      <div className="chart-title">Languages Spoken by Continent</div>
      <svg width="100%" height={continents.length * 40 + 20} className="chart-container">
        {continents.map((continent, index) => (
          <g key={continent.name} onClick={() => handleClick(continent.name)} style={{ cursor: "pointer" }}>
            <rect
              x={0}
              y={index * 40}
              width={continent.languageCount * (windowWidth - 50) / 100}
              height={30}
              fill={selectedContinent === continent.name ? "#007bff" : "#999"}
            />
            <text x={5} y={index * 40 + 20} fill="white" fontSize="14px">
              {continent.name}
            </text>
            <text x={continent.languageCount * (windowWidth - 50) / 100 + 10} y={index * 40 + 20} fontSize="14px">
              {continent.languageCount}
            </text>
          </g>
        ))}
      </svg>
      <div className="chart-instructions">Click on a continent to filter the country table</div>
    </div>
  );
};

export default RegionChart;
