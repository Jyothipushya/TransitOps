import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";

import FuelForm from "../assets/components/fuel/FuelForm";
import FuelModal from "../assets/components/fuel/FuelModal";

import {
  getFuelLogs,
  createFuel,
  updateFuel,
  deleteFuel,
} from "../services/fuelService";

import toast from "react-hot-toast";

function Fuel() {
  const [fuelLogs, setFuelLogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingFuel, setEditingFuel] = useState(null);

  useEffect(() => {
    fetchFuelLogs();
  }, []);

  const fetchFuelLogs = async () => {
    try {
      const data = await getFuelLogs();
      setFuelLogs(data.fuels);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load fuel records");
    }
  };

  const handleAdd = () => {
    setEditingFuel(null);
    setOpenModal(true);
  };

  const handleEdit = (fuel) => {
    setEditingFuel(fuel);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this fuel record?")) return;

    try {
      await deleteFuel(id);
      toast.success("Fuel record deleted");
      fetchFuelLogs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingFuel) {
        await updateFuel(editingFuel._id, formData);
        toast.success("Fuel record updated");
      } else {
        await createFuel(formData);
        toast.success("Fuel record added");
      }

      setOpenModal(false);
      fetchFuelLogs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Operation Failed"
      );
    }
  };

  const columns = [
    {
      title: "Vehicle",
      render: (row) => row.vehicle?.vehicleName || "N/A",
    },
    {
      key: "liters",
      title: "Fuel (L)",
    },
    {
      key: "cost",
      title: "Cost (₹)",
    },
    {
      key: "odometer",
      title: "Odometer",
    },
    {
      key: "fuelStation",
      title: "Fuel Station",
    },
    {
      key: "date",
      title: "Date",
      render: (row) =>
        new Date(row.date).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Fuel & Expenses
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Fuel Log
        </button>
      </div>

      <Table
        columns={columns}
        data={fuelLogs}
      />

      <FuelModal
        isOpen={openModal}
        title={
          editingFuel
            ? "Edit Fuel Record"
            : "Add Fuel Record"
        }
        onClose={() => setOpenModal(false)}
      >
        <FuelForm
          initialData={editingFuel}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </FuelModal>
    </>
  );
}

export default Fuel;