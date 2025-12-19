import { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentStatus,
  EquipmentType,
} from "../types/Equipment";

interface Props {
  initialData?: Equipment | null;
  onSubmit: (data: Omit<Equipment, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const emptyForm = {
  name: "",
  type: "Machine" as EquipmentType,
  status: "Active" as EquipmentStatus,
  lastCleanedDate: "",
};

function EquipmentForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        type: initialData.type,
        status: initialData.status,
        lastCleanedDate: initialData.lastCleanedDate.slice(0, 10),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.status || !form.lastCleanedDate) {
      setError("All fields are required");
      return;
    }

    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>{initialData ? "Edit Equipment" : "Add Equipment"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Type:
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>
      </label>

      <label>
        Status:
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </label>

      <label>
        Last Cleaned Date:
        <input
          type="date"
          name="lastCleanedDate"
          value={form.lastCleanedDate}
          onChange={handleChange}
        />
      </label>

      <div style={{ marginTop: "10px" }}>
        <button type="submit">
          {initialData ? "Update" : "Add"}
        </button>{" "}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const formStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "15px",
  marginTop: "20px",
  maxWidth: "400px",
};

export default EquipmentForm;
