import { useState, useEffect } from "react";

function DriverForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    licenseCategory: "LMV",
    licenseExpiryDate: "",
    contactNumber: "",
    safetyScore: 100,
    status: "Available",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        licenseExpiryDate: initialData.licenseExpiryDate
          ? initialData.licenseExpiryDate.substring(0, 10)
          : "",
      });
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
        type="text"
        name="name"
        placeholder="Driver Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="licenseNumber"
        placeholder="License Number"
        value={formData.licenseNumber}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="licenseCategory"
        value={formData.licenseCategory}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="LMV">LMV</option>
        <option value="HMV">HMV</option>
        <option value="Transport">Transport</option>
        <option value="Heavy">Heavy</option>
      </select>

      <input
        type="date"
        name="licenseExpiryDate"
        value={formData.licenseExpiryDate}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="safetyScore"
        value={formData.safetyScore}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Available">Available</option>
        <option value="On Trip">On Trip</option>
        <option value="Off Duty">Off Duty</option>
        <option value="Suspended">Suspended</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          Save Driver
        </button>

      </div>

    </form>
  );
}

export default DriverForm;