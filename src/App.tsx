import "./App.css";
import { useState } from "react";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (deletedTask: string) => {
    setTasks(tasks.filter((task) => task !== deletedTask));
  };
  return (
    <div>
      <h3>Todos</h3>
      <form>
        <input
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul>
        {tasks.map((item) => (
          <li>
            {item}
            <button className="delete-button" onClick={() => deleteTask(item)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
