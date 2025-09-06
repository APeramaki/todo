import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Task } from "./types/Task";
import { Row } from "./components/Row";

const url = "http://localhost:3001";

type Response = {
  data: Task[];
};

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res: Response) => setTasks(res.data))
      .catch((err: any) =>
        alert(err.response ? err.response.data.error?.message : err)
      );
  }, []);

  const addTask = () => {
    const newTask = { description: task };
    axios
      .post(url + "/create", { task: newTask })
      .then((res: { data: Task }) => {
        setTasks([...tasks, res.data]);
        setTask("");
      })
      .catch((err: any) =>
        alert(err.response ? err.response.data.error?.message : err)
      );
  };

  const deleteTask = (deletedTask: number) => {
    axios
      .delete(url + `/delete/${deletedTask}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== deletedTask));
      })
      .catch((err: any) => {
        alert(err.response ? err.response.data.error?.message : err);
      });
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
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}
export default App;
