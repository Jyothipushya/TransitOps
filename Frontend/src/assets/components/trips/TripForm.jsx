import { useEffect, useState } from "react";
import { getVehicles } from "../../../services/vehicleService";
import { getDrivers } from "../../../services/driverService";

function TripForm({ initialData, onSubmit, onCancel }) {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: "",
    driver: "",
    source: "",
    destination: "",
    cargoWeight: "",
    distance: "",
    fuelUsed: "",
    status: "Scheduled",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        vehicle:
          initialData.vehicle?._id || initialData.vehicle,
        driver:
          initialData.driver?._id || initialData.driver,
        startTime: initialData.startTime
          ? initialData.startTime.substring(0, 16)
          : "",
        endTime: initialData.endTime
          ? initialData.endTime.substring(0, 16)
          : "",
      });
    }
  }, [initialData]);

  const loadData = async () => {
    try {
      const vehicleRes = await getVehicles();
      const driverRes = await getDrivers();

      setVehicles(vehicleRes.vehicles);
      setDrivers(driverRes.drivers);
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
        name="driver"
        value={formData.driver}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      >
        <option value="">Select Driver</option>

        {drivers.map((driver) => (
          <option key={driver._id} value={driver._id}>
            {driver.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="source"
        placeholder="Source"
        value={formData.source}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="cargoWeight"
        placeholder="Cargo Weight"
        value={formData.cargoWeight}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="distance"
        placeholder="Distance"
        value={formData.distance}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="fuelUsed"
        placeholder="Fuel Used"
        value={formData.fuelUsed}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Scheduled">Scheduled</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
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
          Save Trip
        </button>
      </div>

    </form>
  );
}

export default TripForm;