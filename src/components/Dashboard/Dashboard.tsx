import React, { useState } from 'react'
import { RegionChart } from '../RegionChart'
import { CountryTable } from '../CountryTable'

export const Dashboard = () => {
  const selectedContinent = 'To do'

  return (
    <div className="dashboard">
      <h2>Regions by Population</h2>
      <RegionChart />
      <h2>Countries {selectedContinent ? `in ${selectedContinent}` : ''}</h2>
      <CountryTable c />
    </div>
  )
}
