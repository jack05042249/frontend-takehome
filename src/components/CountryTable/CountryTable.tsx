import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import './CountryTable.css'

/**
 * GraphQL queries to fetch countries with or without continent filtering
 */

/* To do */

interface CountryTableProps {
  continent: string | null
}

/**
 * CountryTable Component
 *
 * Displays country data in a sortable table with the following features:
 * - Columns for country name, capital, number of languages spoken, and continent
 * - Sortable by country name and number of languages spoken
 * - Can be filtered by continent
 * - Displays loading and error states
 */

export const CountryTable = () => {
  /* To do */

  return (
    <div className="country-table-container">
      <div className="table-header"></div>

      <div className="table-footer">
        <small>Click column headers to sort</small>
      </div>
    </div>
  )
}
