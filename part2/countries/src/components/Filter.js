const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter by name: <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
