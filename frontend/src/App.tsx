import { useEffect, useState } from "react";
import EquipmentTable from "./components/EquipmentTable";
import EquipmentForm from "./components/EquipmentForm";
import {
  fetchEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} from "./services/api";
import { Equipment } from "./types/Equipment";
import Toast from "./components/Toast";


function App() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState<{
  message: string;
  type: "success" | "error";
  } | null>(null);

  useEffect(() => {
  if (toast) {
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }
  }, [toast]);


  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    const data = await fetchEquipment();
    setEquipment(data);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: Equipment) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this equipment?"
  );

  if (!confirmed) return;

  try {
    await deleteEquipment(id);
    setEquipment((prev) => prev.filter((item) => item.id !== id));

    setToast({
      message: "Equipment deleted successfully",
      type: "success",
    });
  } catch (error) {
    setToast({
      message: "Failed to delete equipment",
      type: "error",
    });
    }
  };


  const handleSubmit = async (formData: any) => {
    if (editingItem) {
      await updateEquipment(editingItem.id, formData);
    } else {
      await addEquipment(formData);
    }
    setShowForm(false);
    loadEquipment();
  };

  const filteredEquipment = equipment.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesType = typeFilter
    ? item.type === typeFilter
    : true;

  const matchesStatus = statusFilter
    ? item.status === statusFilter
    : true;

  return matchesSearch && matchesType && matchesStatus;
  });


  return (
    <div style={{ padding: "20px" }}>
      <h1>Equipment Tracker</h1>

      <button onClick={handleAdd}>Add Equipment</button>

      {showForm && (
        <EquipmentForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div style={{ margin: "15px 0", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>


      <EquipmentTable
        equipment={filteredEquipment}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
      )}

      


    </div>
    

  );
}

export default App;
