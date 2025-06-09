import { useState,useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent.jsx";
import ExpenseContext from "./store/expense-context.jsx";
import GroupContext from "./store/group-context.jsx";
function App() {
  const [groups, setGroup] = useState({
    groups: [],
    selectedGroup: "",
  });
  const [expenses, setExpenses] = useState({
    expenses: []
  })
  function addGroup(newValue) {
    setGroup((prevValue) => {
      return {
        ...prevValue,
        groups: [...prevValue.groups, newValue],
      };
    });
  }
  function deleteGroup(index){
    const newValue = groups.groups.filter((group, i)=> i !== index)
    setGroup(prevValue=>{
      return {
        ...prevValue,
        groups: newValue
      }
    })
  }
  function changeSelectedGroup(newValue) {
    setGroup((prevValue) => {
      return {
        ...prevValue,
        selectedGroup: newValue,
      };
    });
  }
  function addExpense(newValue){
    setExpenses((prevValue)=>{
        return {
            ...prevValue,
            expenses: [...prevValue.expenses, newValue]
        }
    })
  }
  function deleteExpense(index){
    const newValue = expenses.expenses.filter((expense, i)=> i !== index)
    setExpenses((prevValue)=>{
      return {
        expenses: newValue
      }
    })
  }
  function editExpense(value, index) {
    setExpenses((prevValue) => {
      return {
        expenses: prevValue.expenses.map((expense, i) =>
          i === index ? value : expense
        ),
      };
    });
  }
  useEffect(() => {
    console.log("Expenses updated:", expenses.expenses);
  }, [expenses]);
  const expenseCtxValue = {
    expenses: expenses.expenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    editExpense: editExpense
  };
  const groupCtxValue = {
    groups: groups.groups,
    selectedGroup: groups.selectedGroup,
    addGroup: addGroup,
    changeSelectedGroup: changeSelectedGroup,
    deleteGroup: deleteGroup
  };
  return (
    <GroupContext value={groupCtxValue}>
      <ExpenseContext value={expenseCtxValue}>
        <Header />
        <div className="container">
          <Sidebar />
          {groupCtxValue.selectedGroup !== "" && <MainContent />}
        </div>
      </ExpenseContext>
    </GroupContext>
  );
}

export default App;
