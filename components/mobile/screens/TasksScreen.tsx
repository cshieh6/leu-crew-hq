
"use client";

import TaskCard from "../../TaskCard";
import AppHeader from "../AppHeader";
import BottomNav from "../BottomNav";
import PageContainer from "../PageContainer";
import Card from "../Card";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  due_date: string | null;
  created_at: string;
  assigned_to: string | null;
  is_recurring?: boolean;
  recurrence?: string | null;
};

type TasksScreenProps = {
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

  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TasksScreen({
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

  activeTab,
  setActiveTab,
}: TasksScreenProps) {
  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <PageContainer>
      <AppHeader
        title="📝 Tasks"
        subtitle="Keep the Leu Crew moving"
      />

      {/* Task Summary */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                color: "#777",
                marginBottom: 5,
              }}
            >
              Tasks to do
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {remainingTasks}
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              color: "#777",
              fontSize: 14,
            }}
          >
            <div>
              {completedTasks} completed
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "#999",
              }}
            >
              {tasks.length} total
            </div>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <Card>
        <div
          style={{
            marginBottom: 18,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 4,
            }}
          >
            📋 Task List
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            Add, assign, and keep track of what needs to get done.
          </div>
        </div>

        <TaskCard
          tasks={tasks}

          newTask={newTask}
          setNewTask={setNewTask}

          newTaskDueDate={newTaskDueDate}
          setNewTaskDueDate={setNewTaskDueDate}

          newTaskAssignedTo={newTaskAssignedTo}
          setNewTaskAssignedTo={setNewTaskAssignedTo}

          newTaskRecurrence={newTaskRecurrence}
          setNewTaskRecurrence={setNewTaskRecurrence}

          addTask={addTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}

          updateTask={updateTask}
        />
      </Card>

      {/* Bottom navigation spacing */}
      <div style={{ height: 90 }} />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </PageContainer>
  );
}

