import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem('toDoList'));
    if (storedToDos) {
      setToDoList(storedToDos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && toDo.trim() && !toDoList.includes(toDo.trim())) {
      setToDoList([...toDoList, toDo.trim()]);
      setToDo("");
    }
  };

  const handleDelete = (index) => {
    console.log("Borrando tarea en el índice:", index); 
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      setToDoList((prevList) => prevList.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="text-center container my-5">
      <h1 className="text-muted"><em>ToDoList</em></h1>
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
              onClick={() => handleDelete(index)}
            ></button>
          </li>
        ))}
        {toDoList.length > 0 && (
          <li className="list-group-item text-muted">
            Total Tasks: {toDoList.length}
          </li>
        )}
      </ol>
    </div>
  );
};

export default ToDoList;
