import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = { id: Date.now(), label: newTask, is_done: false };
      setTasks((prevTasks) => [...prevTasks, newTodo]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllTasks = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todas las tareas?")) {
      setTasks([]);
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, is_done: !task.is_done } : task
      )
    );
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">TodoList</h1>
      <button className="btn btn-danger mb-3" onClick={handleDeleteAllTasks}>
        Eliminar todas las tareas
      </button>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Agregar Tarea
        </button>
      </div>
      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item">No hay tareas, añade una</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                checked={task.is_done}
                onChange={() => handleToggleTask(task.id)}
              />
              <span>{task.label}</span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
