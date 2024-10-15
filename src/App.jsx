import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTask } from "./tasksSlice";
import { toggleTheme } from "./themeSlice";

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ name: newTask, isCompleted: false }));
      setNewTask("");
    }
  };

  const handleToggleCompletion = (task) => {
    dispatch(
      updateTask({
        id: task.id,
        updatedTask: { isCompleted: !task.isCompleted },
      })
    );
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  console.log(tasks);
  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <h1>TODO App</h1>

      <button onClick={handleThemeToggle}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleCompletion(task)}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
