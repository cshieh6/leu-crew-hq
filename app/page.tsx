"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [shopping, setShopping] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: tasksData, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    const { data: shoppingData, error: shoppingError } = await supabase
      .from("shopping")
      .select("*")
      .order("created_at", { ascending: true });

    console.log("FETCH TASKS ERROR:", taskError);
    console.log("FETCH SHOPPING ERROR:", shoppingError);

    setTasks(tasksData || []);
    setShopping(shoppingData || []);
  }

  async function addTask() {
    if (!newTask.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .insert({ text: newTask });

    console.log("ADD TASK ERROR:", error);

    if (!error) {
      setNewTask("");
      fetchData();
    }
  }

  async function addItem() {
    if (!newItem.trim()) return;

    const { error } = await supabase
      .from("shopping")
      .insert({ text: newItem });

    console.log("ADD ITEM ERROR:", error);

    if (!error) {
      setNewItem("");
      fetchData();
    }
  }

  async function deleteTask(id: number) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    console.log("DELETE TASK ERROR:", error);

    fetchData();
  }

  async function deleteItem(id: number) {
    const { error } = await supabase
      .from("shopping")
      .delete()
      .eq("id", id);

    console.log("DELETE ITEM ERROR:", error);

    fetchData();
  }

  return (
    <main
      style={{
        padding: 32,
        maxWidth: 1000,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      <Header />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 32,
        }}
      >
        {/* TASKS */}
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

            <button onClick={addTask}>
              Add
            </button>
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
                <span>{task.text}</span>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* SHOPPING */}
        <section
          style={{
            border: "1px solid #ddd",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h2>🛒 Shopping</h2>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add item"
            />

            <button onClick={addItem}>
              Add
            </button>
          </div>

          <ul style={{ padding: 0, marginTop: 20 }}>
            {shopping.map((item) => (
              <li
                key={item.id}
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
                <span>{item.text}</span>

                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}