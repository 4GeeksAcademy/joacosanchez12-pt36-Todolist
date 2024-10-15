import React, { useState } from 'react';


const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && toDo) {
      setToDoList([...toDoList, toDo]);
      setToDo("");
    }
  };

  return (
    <div className="text-center container my-5 ">
      <h1 className="text-muted "><em>ToDoList</em></h1>
      <input
        className="form-control"
        placeholder="Enter a task here"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ol className="todo-list list-group text-start">
        {toDoList.map((task, index) => (
          <li className="list-group-item todo-item" key={index}>
            {task}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setToDoList((prevListItem) => prevListItem.filter((_, i) => i !== index));
              }}
            ></button>
          </li>
        ))}
        {toDoList.length > 0 && (
          <li className="list-group-item text-muted">
            Total Tasks: {toDoList.length}
          </li>
        )}
        {toDoList.length > 0 && (
          <div clasName="leaf-container">
            <div className="leaf-1 p-1 shadow">
            </div>
            <div className="leaf-2 p-1 shadow">
            </div>
            <div className="leaf-3 p-1 shadow">
            </div>
          </div>)}
      </ol>

    </div>
  );
};

export default ToDoList;