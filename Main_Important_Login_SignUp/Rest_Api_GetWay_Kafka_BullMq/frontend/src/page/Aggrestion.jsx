import React, { useState } from "react";
import axios from "axios";

const AggregateSearch = () => {
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    minAge: "",
    maxAge: "",
    gender: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:9000/aggregate", {
        params: filters,
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h2>Search Aggregated Users</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Search by country"
          value={filters.country}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minAge"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxAge"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={handleChange}
        />
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.map((group, index) => (
        <div key={index} style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h3>Age: {group._id}</h3>
          <ul>
            {group.userInfo.map((user, idx) => (
              <li key={idx}>
                <strong>{user.name}</strong> ({user.country}) - {user.gender} <br />
                Hobbies: {user.hobbies?.join(", ")} <br />
                Bio: {user.bio} | Eligible: {user.isEligible ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AggregateSearch;
