type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskCardProps = {
  tasks: Task[];
  newTask: string;
  setNewTask: (value: string) => void;
  addTask: () => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number, completed: boolean) => void;
};

export default function TaskCard({
  tasks,
  newTask,
  setNewTask,
  addTask,
  deleteTask,
  toggleTask,
}: TaskCardProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <h2>✅ Tasks</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ padding: 0, marginTop: 20 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginBottom: 8,
              borderRadius: 8,
              background: "#f7f7f7",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  toggleTask(task.id, task.completed)
                }
              />

              <span
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                  opacity: task.completed ? 0.5 : 1,
                }}
              >
                {task.text}
              </span>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}