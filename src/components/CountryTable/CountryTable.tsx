import React, { useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Country, GetCountriesData, SortKey } from "../../types/types";
import "./CountryTable.css";

// GraphQL query to get countries
const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

interface CountryTableProps {
  filterContinent: string | null;
}

interface Column {
  label: string;
  key: SortKey;
  isSortable: boolean;
}

export const CountryTable: React.FC<CountryTableProps> = ({ filterContinent }) => {
  const { loading, error, data } = useQuery<GetCountriesData>(GET_COUNTRIES);

  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null);

  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return filterContinent
      ? data.countries.filter((country) => country.continent.name === filterContinent)
      : data.countries;
  }, [data, filterContinent]);

  const sortedCountries = useMemo(() => {
    if (!sortConfig) return filteredCountries;
    return [...filteredCountries].sort((a, b) => {
      const aValue =
        sortConfig.key === SortKey.LanguagesCount
          ? a.languages.length
          : a[sortConfig.key as keyof Country] || "";
      const bValue =
        sortConfig.key === SortKey.LanguagesCount
          ? b.languages.length
          : b[sortConfig.key as keyof Country] || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredCountries, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig?.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const columns: Column[] = [
    { label: "Country Name", key: SortKey.Name, isSortable: true },
    { label: "Capital", key: SortKey.Capital, isSortable: false },
    { label: "Languages Spoken", key: SortKey.LanguagesCount, isSortable: true },
    { label: "Continent", key: SortKey.Continent, isSortable: false },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <div>
        <small>Click column headers to sort</small>
      </div>
      <div className="country-table-container">
        <table className="country-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={column.isSortable ? () => handleSort(column.key) : undefined}
                >
                  {column.label}
                  {column.isSortable && sortConfig?.key === column.key && (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCountries.map((country) => (
              <tr key={country.code}>
                <td>{country.name}</td>
                <td>{country.capital || "N/A"}</td>
                <td>{country.languages.length}</td>
                <td>{country.continent.name}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
