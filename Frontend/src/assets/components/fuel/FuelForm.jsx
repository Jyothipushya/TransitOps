import { useEffect, useState } from "react";
import { getVehicles } from "../../../services/vehicleService";

function FuelForm({ initialData, onSubmit, onCancel }) {
  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: "",
    liters: "",
    cost: "",
    odometer: "",
    fuelStation: "",
    date: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        vehicle: initialData.vehicle?._id || initialData.vehicle,
        date: initialData.date
          ? initialData.date.substring(0, 10)
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

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submit} className="space-y-4">

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

      <input
        type="number"
        name="liters"
        placeholder="Fuel (Liters)"
        value={formData.liters}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
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
        type="number"
        name="odometer"
        placeholder="Odometer"
        value={formData.odometer}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="fuelStation"
        placeholder="Fuel Station"
        value={formData.fuelStation}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

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
          Save Fuel
        </button>

      </div>

    </form>
  );
}

export default FuelForm;