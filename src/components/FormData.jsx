import { useContext, useState, useEffect } from "react";
import GroupContext from "../store/group-context";
import ExpenseContext from "../store/expense-context";
export default function FormData({ setInput, editData, editIndex }) {
  const { selectedGroup } = useContext(GroupContext);
  const expenseCtx = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    type: "",
    expenseDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  function handleChange(e) {
    setFormData((prevFormValue) => ({
      ...prevFormValue,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newExpense = {
      ...formData,
      groupName: selectedGroup,
    };
    if (editData && editIndex !== null && editIndex !== undefined) {
      expenseCtx.editExpense(newExpense, editIndex);
    } else {
      expenseCtx.addExpense(newExpense);
    }
    setFormData({
      name: "",
      amount: 0,
      type: "",
      expenseDate: new Date().toISOString().split("T")[0],
    });
    setInput(false); // Close the form
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>{editData ? "Edit Expense" : "Add Expense"}</h3>
      <div className="form-group">
        <label>Expense Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Expense Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Type: </label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <input
          type="date"
          name="expenseDate"
          value={formData.expenseDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-buttons">
        <button type="submit">{editData ? "Save Changes" : "Add Expense"}</button>
        <button type="button" onClick={() => setInput(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}