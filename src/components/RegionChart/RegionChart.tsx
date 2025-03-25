import React from 'react'
import { useQuery, gql } from '@apollo/client'
import './RegionChart.css'

const GET_CONTINENTS = gql`
  query GetContinents {
    TO
    DO
  }
`

interface RegionChartProps {
  onRegionClick: (continent: string) => void
  selectedContinent: string | null
}

/**
 * RegionChart Component
 *
 * Displays a horizontal bar chart of continent populations.
 * - Each continent is represented as a bar with length proportional to number of languages
 * - Continents can be selected by clicking, which highlights the bar
 * - Sorted from highest to lowest number of languages
 */
export const RegionChart = ({ onRegionClick, selectedContinent }) => {
  const { loading, error, data } = useQuery(GET_CONTINENTS)

  /*

  TO DO

  */

  return (
    <div className="region-chart">
      <div className="chart-title">Continental Population Distribution</div>
      <div className="chart-container"></div>
      <div className="chart-instructions">
        Click on a continent to filter the country table
      </div>
    </div>
  )
}
