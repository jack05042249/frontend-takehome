import { useState } from "react";
import { RegionChart } from "../RegionChart";
import { CountryTable } from "../CountryTable";

export const Dashboard = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  return (
    <div className="dashboard">
      <h2>Languages Spoken by Continent</h2>
      <RegionChart onRegionClick={setSelectedContinent} selectedContinent={selectedContinent} />
      <h2>Countries {selectedContinent ? `in ${selectedContinent}` : ""}</h2>
      <CountryTable filterContinent={selectedContinent} />
    </div>
  );
};

export default Dashboard;