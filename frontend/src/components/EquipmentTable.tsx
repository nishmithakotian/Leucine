import { Equipment } from "../types/Equipment";

interface Props {
  equipment: Equipment[];
  onEdit: (item: Equipment) => void;
  onDelete: (id: number) => void;
}

function EquipmentTable({ equipment, onEdit, onDelete }: Props) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Type</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Last Cleaned</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {equipment.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
              No equipment found
            </td>
          </tr>
        ) : (
          equipment.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.type}</td>
              <td style={tdStyle}>{item.status}</td>
              <td style={tdStyle}>{item.lastCleanedDate}</td>
              <td style={tdStyle}>
                <button onClick={() => onEdit(item)}>Edit</button>{" "}
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f4f4f4",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default EquipmentTable;
