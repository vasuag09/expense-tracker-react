import { useContext, useState } from "react";
import GroupContext from "../store/group-context";
import FormData from "./FormData";
import ExpenseContext from "../store/expense-context";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function MainContent() {
  const groupCtx = useContext(GroupContext);
  const expenseCtx = useContext(ExpenseContext);
  const groupArray = expenseCtx.expenses.filter(
    (expense) => expense.groupName === groupCtx.selectedGroup
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredExpenses = groupArray.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = groupArray.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const [formInput, setFormInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editExpenseData, setEditExpenseData] = useState(null);

  function handleEdit(expense, index) {
    setEditingIndex(index);
    setEditExpenseData(expense);
    setFormInput(true);
  }

  function handleFormClose() {
    setFormInput(false);
    setEditingIndex(null);
    setEditExpenseData(null);
  }

  return (
    <main className="main-content">
      <h1 className="group-name-heading">{groupCtx.selectedGroup}</h1>
      <div className="group-details-section">
        <button
          className="sidebar-button"
          onClick={() => {
            setFormInput(true);
            setEditingIndex(null);
            setEditExpenseData(null);
          }}
        >
          Add an expense
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="clear-search">
            ✕
          </button>
        )}
        {formInput && (
          <div>
            <FormData
              setInput={handleFormClose}
              editData={editExpenseData}
              editIndex={editingIndex}
            />
          </div>
        )}
        {groupArray.length !== 0 ? (
          <ul>
            {filteredExpenses.map((expense, index) => (
              <li key={index} style={{ cursor: "pointer" }}>
                <span className="expense-name">{expense.name}</span>
                <span className="expense-details">
                  {expense.amount} | {expense.type} | {expense.expenseDate}
                </span>
                <span className="expense-delete-button">
                  <button
                    title="Delete"
                    onClick={() =>
                      expenseCtx.deleteExpense(
                        expenseCtx.expenses.indexOf(expense)
                      )
                    }
                  >
                    <FaTrash />
                  </button>
                  <button
                    title="Edit"
                    onClick={() =>
                      handleEdit(expense, expenseCtx.expenses.indexOf(expense))
                    }
                  >
                    <FaEdit />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses added to this group yet. Start tracking!</p>
        )}
        <div className="total-sum">
          <p>Sum Total of All Expenses: {total}</p>
        </div>
      </div>
    </main>
  );
}
