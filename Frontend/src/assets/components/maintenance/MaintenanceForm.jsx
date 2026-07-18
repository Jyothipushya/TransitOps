import { useEffect, useState } from "react";
import { getVehicles } from "../../../services/vehicleService";

function MaintenanceForm({ initialData, onSubmit, onCancel }) {
  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: "",
    serviceType: "General Service",
    description: "",
    cost: "",
    serviceDate: "",
    nextServiceDate: "",
    status: "Scheduled",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        vehicle: initialData.vehicle?._id || initialData.vehicle,
        serviceDate: initialData.serviceDate
          ? initialData.serviceDate.substring(0, 10)
          : "",
        nextServiceDate: initialData.nextServiceDate
          ? initialData.nextServiceDate.substring(0, 10)
          : "",
      });
    }
  }, [initialData]);

  const loadVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data.vehicles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <select
        name="vehicle"
        value={formData.vehicle}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      >
        <option value="">Select Vehicle</option>

        {vehicles.map((vehicle) => (
          <option key={vehicle._id} value={vehicle._id}>
            {vehicle.vehicleName}
          </option>
        ))}
      </select>

      <select
        name="serviceType"
        value={formData.serviceType}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Oil Change</option>
        <option>Engine Service</option>
        <option>Tyre Replacement</option>
        <option>Brake Service</option>
        <option>General Service</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="cost"
        placeholder="Cost"
        value={formData.cost}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="date"
        name="serviceDate"
        value={formData.serviceDate}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="date"
        name="nextServiceDate"
        value={formData.nextServiceDate}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Scheduled</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg"
        >
          Save Maintenance
        </button>
      </div>

    </form>
  );
}

export default MaintenanceForm;