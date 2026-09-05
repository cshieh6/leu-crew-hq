"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  due_date?: string | null;
  assigned_to?: string | null;
  is_recurring?: boolean;
  recurrence?: string | null;
};

type TaskCardProps = {
  tasks: Task[];
  newTask: string;
  setNewTask: (value: string) => void;

  newTaskDueDate: string;
  setNewTaskDueDate: (value: string) => void;

  newTaskAssignedTo: string;
  setNewTaskAssignedTo: (value: string) => void;

  newTaskRecurrence: string;
  setNewTaskRecurrence: (value: string) => void;

  addTask: () => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number, completed: boolean) => void;

  updateTask: (
    id: number,
    text: string,
    dueDate: string,
    assignedTo: string,
    recurrence: string
  ) => void;
};

function daysUntil(date: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);

  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target.getTime() - today.getTime()) / 86400000
  );
}

function TaskList({
  title,
  icon,
  tasks,
  deleteTask,
  toggleTask,
  startEditing,
  updateTask,
  editingTaskId,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  editAssignedTo,
  setEditAssignedTo,
  editRecurrence,
  setEditRecurrence,
  setEditingTaskId,
}: {
  title: string;
  icon: string;
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number, completed: boolean) => void;

  startEditing: (task: Task) => void;

  updateTask: (
    id: number,
    text: string,
    dueDate: string,
    assignedTo: string,
    recurrence: string
  ) => void;

  editingTaskId: number | null;

  editText: string;
  setEditText: (value: string) => void;

  editDueDate: string;
  setEditDueDate: (value: string) => void;

  editAssignedTo: string;
  setEditAssignedTo: (value: string) => void;

  editRecurrence: string;
  setEditRecurrence: (value: string) => void;

  setEditingTaskId: (id: number | null) => void;
}) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <h3>
        {icon} {title}
      </h3>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            marginBottom: 8,
            borderRadius: 8,
            background: "#f7f7f7",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flex: 1,
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask(task.id, task.completed)
              }
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                  opacity: task.completed ? 0.5 : 1,
                }}
              >
                {task.text}
              </div>

              {task.assigned_to && (
                <small
                  style={{
                    display: "block",
                    opacity: 0.6,
                    marginTop: 2,
                  }}
                >
                  👤 {task.assigned_to}
                </small>
              )}

              {task.due_date && (
                <small
                  style={{
                    display: "block",
                    marginTop: 2,
                  }}
                >
                  Due:{" "}
                  {new Date(
                    task.due_date
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              )}

              {task.is_recurring && (
                <small
                  style={{
                    display: "block",
                    marginTop: 2,
                    opacity: 0.7,
                  }}
                >
                  🔁{" "}
                  {task.recurrence === "weekly"
                    ? "Every week"
                    : task.recurrence === "biweekly"
                    ? "Every 2 weeks"
                    : task.recurrence === "monthly"
                    ? "Every month"
                    : task.recurrence === "quarterly"
                    ? "Every 3 months"
                    : "Recurring"}
                </small>
              )}

              {editingTaskId === task.id && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 8,
                    background: "#fff",
                    border: "1px solid #ddd",
                  }}
                >
                  <input
                    value={editText}
                    onChange={(e) =>
                      setEditText(e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: 8,
                      marginBottom: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  />

                  <div style={{ marginBottom: 8 }}>
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) =>
                        setEditDueDate(e.target.value)
                      }
                    />
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <select
                      value={editAssignedTo}
                      onChange={(e) =>
                        setEditAssignedTo(e.target.value)
                      }
                    >
                      <option value="Christine">
                        Christine
                      </option>

                      <option value="Phil">
                        Phil
                      </option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <select
                      value={editRecurrence}
                      onChange={(e) =>
                        setEditRecurrence(e.target.value)
                      }
                    >
                      <option value="">
                        Never
                      </option>

                      <option value="weekly">
                        Every week
                      </option>

                      <option value="biweekly">
                        Every 2 weeks
                      </option>

                      <option value="monthly">
                        Every month
                      </option>

                      <option value="quarterly">
                        Every 3 months
                      </option>
                    </select>
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <button
                      onClick={async () => {
                        await updateTask(
                          task.id,
                          editText,
                          editDueDate,
                          editAssignedTo,
                          editRecurrence
                        );

                        setEditingTaskId(null);
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={() =>
                        setEditingTaskId(null)
                      }
                      style={{
                        marginLeft: 6,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
            }}
          >
            <button
              onClick={() => startEditing(task)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              ✏️
            </button>

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
          </div>
        </div>
      ))}
    </div>
  );
}

type TaskFilter =
  | "All"
  | "Christine"
  | "Phil"
  | "Completed";

export default function TaskCard({
  tasks,
  newTask,
  setNewTask,
  newTaskDueDate,
  setNewTaskDueDate,
  newTaskAssignedTo,
  setNewTaskAssignedTo,
  newTaskRecurrence,
  setNewTaskRecurrence,
  addTask,
  deleteTask,
  toggleTask,
  updateTask,
}: TaskCardProps) {
  const [activeFilter, setFilter] =
    useState<TaskFilter>("All");

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const [editText, setEditText] =
    useState("");

  const [editDueDate, setEditDueDate] =
    useState("");

  const [editAssignedTo, setEditAssignedTo] =
    useState("Christine");

  const [editRecurrence, setEditRecurrence] =
    useState("");

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
    setEditDueDate(task.due_date || "");
    setEditAssignedTo(
      task.assigned_to || "Christine"
    );
    setEditRecurrence(
      task.is_recurring
        ? task.recurrence || ""
        : ""
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "Christine") {
      return (
        task.assigned_to === "Christine" &&
        !task.completed
      );
    }

    if (activeFilter === "Phil") {
      return (
        task.assigned_to === "Phil" &&
        !task.completed
      );
    }

    if (activeFilter === "Completed") {
      return task.completed;
    }

    return !task.completed;
  });

  const overdue = filteredTasks.filter(
    (task) =>
      task.due_date &&
      daysUntil(task.due_date) < 0
  );

  const upcoming = filteredTasks.filter(
    (task) =>
      !task.due_date ||
      daysUntil(task.due_date) >= 0
  );

  const completed = filteredTasks.filter(
    (task) => task.completed
  );

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <h2>✅ Tasks</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        {(
          [
            "All",
            "Christine",
            "Phil",
            "Completed",
          ] as TaskFilter[]
        ).map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            style={{
              padding: "8px 12px",
              borderRadius: 20,
              border: "1px solid #ccc",
              background:
                filter === activeFilter
                  ? "#222"
                  : "#fff",
              color:
                filter === activeFilter
                  ? "#fff"
                  : "#222",
              cursor: "pointer",
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <input
          style={{
            flex: 1,
            minWidth: 150,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
          placeholder="Add task"
        />

        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) =>
            setNewTaskDueDate(e.target.value)
          }
        />

        <select
          value={newTaskAssignedTo}
          onChange={(e) =>
            setNewTaskAssignedTo(e.target.value)
          }
        >
          <option value="Christine">
            Christine
          </option>

          <option value="Phil">
            Phil
          </option>
        </select>

        <select
          value={newTaskRecurrence}
          onChange={(e) =>
            setNewTaskRecurrence(e.target.value)
          }
        >
          <option value="">
            Never
          </option>

          <option value="weekly">
            Every week
          </option>

          <option value="biweekly">
            Every 2 weeks
          </option>

          <option value="monthly">
            Every month
          </option>

          <option value="quarterly">
            Every 3 months
          </option>
        </select>

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <TaskList
        title="Overdue"
        icon="🔴"
        tasks={overdue}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        startEditing={startEditing}
        updateTask={updateTask}
        editingTaskId={editingTaskId}
        editText={editText}
        setEditText={setEditText}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        editAssignedTo={editAssignedTo}
        setEditAssignedTo={setEditAssignedTo}
        editRecurrence={editRecurrence}
        setEditRecurrence={setEditRecurrence}
        setEditingTaskId={setEditingTaskId}
      />

      <TaskList
        title="Upcoming"
        icon="📋"
        tasks={upcoming}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        startEditing={startEditing}
        updateTask={updateTask}
        editingTaskId={editingTaskId}
        editText={editText}
        setEditText={setEditText}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        editAssignedTo={editAssignedTo}
        setEditAssignedTo={setEditAssignedTo}
        editRecurrence={editRecurrence}
        setEditRecurrence={setEditRecurrence}
        setEditingTaskId={setEditingTaskId}
      />

      <TaskList
        title="Completed"
        icon="✅"
        tasks={completed}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        startEditing={startEditing}
        updateTask={updateTask}
        editingTaskId={editingTaskId}
        editText={editText}
        setEditText={setEditText}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        editAssignedTo={editAssignedTo}
        setEditAssignedTo={setEditAssignedTo}
        editRecurrence={editRecurrence}
        setEditRecurrence={setEditRecurrence}
        setEditingTaskId={setEditingTaskId}
      />
    </section>
  );
}