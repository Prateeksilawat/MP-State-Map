const years = [
  1956, 1972, 1998, 2003, 2008, 2013, 2018, 2023
];

const Sidebar = ({ selectedYear, setSelectedYear }) => {
  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        MP District Timeline
      </h2>

      {years.map((year) => (
        <div
          key={year}
          onClick={() => setSelectedYear(year)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            background: selectedYear === year ? "#2563eb" : "#1f2937",
            transition: "0.3s"
          }}
        >
          {year}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;