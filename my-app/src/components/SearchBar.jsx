import React from "react";

const SearchBar = ({ searchText, setSearchText, onSearch }) => (
  <div style={{ display: "flex", marginBottom: "20px" }}>
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Type your prompt..."
      style={{ flex: 1, padding: "10px" }}
    />
    <button onClick={onSearch} style={{ marginLeft: "10px" }}>
      Search
    </button>
  </div>
);

export default SearchBar;
