const API_BASE_URL = "http://localhost:5000/api";

export async function fetchEquipment() {
  const res = await fetch(`${API_BASE_URL}/equipment`);
  return res.json();
}

export async function addEquipment(data: any) {
  const res = await fetch(`${API_BASE_URL}/equipment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEquipment(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEquipment(id: number) {
  await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: "DELETE",
  });
}
