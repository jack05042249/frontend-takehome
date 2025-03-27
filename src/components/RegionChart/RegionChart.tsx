import React, { useMemo } from "react";
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
    <div className="region-chart">
      <div className="chart-title">Languages Spoken by Continent</div>
      <svg width="100%" height={continents.length * 40 + 20} className="chart-container">
        {continents.map((continent, index) => (
          <g key={continent.name} onClick={() => handleClick(continent.name)} style={{ cursor: "pointer" }}>
            <rect
              x={0}
              y={index * 40}
              width={continent.languageCount * 10}
              height={30}
              fill={selectedContinent === continent.name ? "#007bff" : "#999"}
            />
            <text x={5} y={index * 40 + 20} fill="white" fontSize="14px">
              {continent.name}
            </text>
            <text x={continent.languageCount * 10 + 10} y={index * 40 + 20} fontSize="14px">
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
