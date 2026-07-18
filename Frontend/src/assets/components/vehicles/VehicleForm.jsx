import { useState, useEffect } from "react";

function VehicleForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vehicleName: "",
    vehicleType: "",
    maximumLoadCapacity: "",
    odometer: "",
    acquisitionCost: "",
    status: "Available",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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

      <input
        name="registrationNumber"
        placeholder="Registration Number"
        value={formData.registrationNumber}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="vehicleName"
        placeholder="Vehicle Name"
        value={formData.vehicleName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="vehicleType"
        placeholder="Vehicle Type"
        value={formData.vehicleType}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="maximumLoadCapacity"
        placeholder="Maximum Load Capacity"
        value={formData.maximumLoadCapacity}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="odometer"
        placeholder="Odometer"
        value={formData.odometer}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="acquisitionCost"
        placeholder="Acquisition Cost"
        value={formData.acquisitionCost}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Available</option>
        <option>On Trip</option>
        <option>In Shop</option>
        <option>Retired</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-violet-600 text-white rounded-lg"
        >
          Save Vehicle
        </button>

      </div>

    </form>
  );
}

export default VehicleForm;