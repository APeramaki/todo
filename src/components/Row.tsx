import type { Task } from "../types/Task";

export function Row({
  item,
  deleteTask,
}: {
  item: Task;
  deleteTask: (id: number) => void;
}) {
  return (
    <li>
      {item.description}
      <button className="delete-button" onClick={() => deleteTask(item.id)}>
        Delete
      </button>
    </li>
  );
}
