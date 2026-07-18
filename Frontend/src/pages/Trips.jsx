import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";
import StatusBadge from "../assets/components/common/StatusBadge";

import TripForm from "../assets/components/trips/TripForm";
import TripModal from "../assets/components/trips/TripModal";

import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../services/tripService";

import toast from "react-hot-toast";

function Trips() {
  const [trips, setTrips] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data.trips);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load trips");
    }
  };

  const handleAdd = () => {
    setEditingTrip(null);
    setOpenModal(true);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTrip(id);

      toast.success("Trip Deleted");

      fetchTrips();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTrip) {
        await updateTrip(editingTrip._id, formData);

        toast.success("Trip Updated");
      } else {
        await createTrip(formData);

        toast.success("Trip Created");
      }

      setOpenModal(false);

      fetchTrips();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  const columns = [
    {
      key: "source",
      title: "Source",
    },
    {
      key: "destination",
      title: "Destination",
    },
    {
      title: "Vehicle",
      render: (row) =>
        row.vehicle?.vehicleName || "N/A",
    },
    {
      title: "Driver",
      render: (row) =>
        row.driver?.name || "N/A",
    },
    {
      key: "cargoWeight",
      title: "Cargo (kg)",
    },
    {
      key: "distance",
      title: "Distance",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
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
          Trips
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Create Trip
        </button>

      </div>

      <Table
        columns={columns}
        data={trips}
      />

      <TripModal
        isOpen={openModal}
        title={
          editingTrip
            ? "Edit Trip"
            : "Create Trip"
        }
        onClose={() => setOpenModal(false)}
      >
        <TripForm
          initialData={editingTrip}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </TripModal>
    </>
  );
}

export default Trips;