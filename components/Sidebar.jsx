import { useContext, useState } from "react";
import GroupContext from "../store/group-context";
import { FaTrash } from "react-icons/fa";
export default function Sidebar() {
  const [input, setInput] = useState("");
  const groupCtx = useContext(GroupContext);
  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleAdd() {
    if (input.trim() === "") return;
    groupCtx.addGroup({ name: input.trim() });
    setInput("");
  }
  return (
    <aside className="sidebar">
      <h2>Groups</h2>
      <>
        <button className="sidebar-button" onClick={() => setInput(" ")}>
          Add New Groups
        </button>
        {input !== "" && (
          <div className="new-group-name-container">
            <input
              type="text"
              placeholder="Enter new group name"
              onChange={handleChange}
              className="new-group-name-input"
            />
            <button className="sidebar-button" onClick={handleAdd}>
              Add
            </button>
          </div>
        )}
      </>
      {groupCtx.groups.length === 0 ? (
        <p>No groups available</p>
      ) : (
        <ul>
          {groupCtx.groups.map((group, index) => (
            <li key={index} className="group-list-item">
              <div className="group-item-row">
                <button
                  id={
                    groupCtx.selectedGroup.trim() === group.name
                      ? "selected"
                      : undefined
                  }
                  className="group-select-button"
                  onClick={() => groupCtx.changeSelectedGroup(group.name)}
                >
                  {group.name}
                </button>

                <button
                  id="group-delete-button"
                  title="Delete Group"
                  onClick={() => groupCtx.deleteGroup(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
