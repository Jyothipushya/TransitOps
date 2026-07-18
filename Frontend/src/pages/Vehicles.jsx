import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";
import StatusBadge from "../assets/components/common/StatusBadge";
import VehicleForm from "../assets/components/vehicles/VehicleForm";
import VehicleModal from "../assets/components/vehicles/VehicleModal";

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";

import toast from "react-hot-toast";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data.vehicles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vehicles");
    }
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setOpenModal(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVehicle(id);

      toast.success("Vehicle Deleted");

      fetchVehicles();
    } catch (error) {
      console.error(error);

      toast.error("Delete Failed");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle._id, formData);

        toast.success("Vehicle Updated");
      } else {
        await createVehicle(formData);

        toast.success("Vehicle Added");
      }

      setOpenModal(false);

      fetchVehicles();
    } catch (error) {
      console.error(error);

      toast.error("Operation Failed");
    }
  };

  const columns = [
    {
      key: "registrationNumber",
      title: "Registration",
    },
    {
      key: "vehicleName",
      title: "Vehicle",
    },
    {
      key: "vehicleType",
      title: "Type",
    },
    {
      key: "maximumLoadCapacity",
      title: "Capacity",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      key: "actions",
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
          Vehicles
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Vehicle
        </button>

      </div>

      <Table columns={columns} data={vehicles} />

      <VehicleModal
        isOpen={openModal}
        title={
          editingVehicle
            ? "Edit Vehicle"
            : "Add Vehicle"
        }
        onClose={() => setOpenModal(false)}
      >
        <VehicleForm
          initialData={editingVehicle}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </VehicleModal>
    </>
  );
}

export default Vehicles;