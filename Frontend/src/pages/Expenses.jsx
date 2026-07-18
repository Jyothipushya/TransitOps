import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";

import ExpenseForm from "../assets/components/expenses/ExpenseForm";
import ExpenseModal from "../assets/components/expenses/ExpenseModal";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

import toast from "react-hot-toast";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load expenses");
    }
  };

  const handleAdd = () => {
    setEditingExpense(null);
    setOpenModal(true);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await deleteExpense(id);
      toast.success("Expense deleted");
      fetchExpenses();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
        toast.success("Expense updated");
      } else {
        await createExpense(formData);
        toast.success("Expense added");
      }

      setOpenModal(false);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation Failed");
    }
  };

  const columns = [
    {
      key: "title",
      title: "Title",
    },
    {
      key: "category",
      title: "Category",
    },
    {
      key: "amount",
      title: "Amount (₹)",
    },
    {
      key: "date",
      title: "Date",
      render: (row) =>
        new Date(row.date).toLocaleDateString(),
    },
    {
      key: "remarks",
      title: "Remarks",
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
          Expenses
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      </div>

      <Table columns={columns} data={expenses} />

      <ExpenseModal
        isOpen={openModal}
        title={
          editingExpense
            ? "Edit Expense"
            : "Add Expense"
        }
        onClose={() => setOpenModal(false)}
      >
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </ExpenseModal>
    </>
  );
}

export default Expenses;