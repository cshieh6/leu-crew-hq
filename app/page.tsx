"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

    console.log("FETCH TASKS:", tasksData);
    console.log("FETCH TASKS ERROR:", taskError);

    console.log("FETCH SHOPPING:", shoppingData);
    console.log("FETCH SHOPPING ERROR:", shoppingError);

    setTasks(tasksData || []);
    setShopping(shoppingData || []);
  }

  async function addTask() {
    if (!newTask.trim()) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ text: newTask })
      .select();

    console.log("ADD TASK:", { data, error });

    if (!error) {
      setNewTask("");
      fetchData();
    }
  }

  async function addItem() {
    if (!newItem.trim()) return;

    const { data, error } = await supabase
      .from("shopping")
      .insert({ text: newItem })
      .select();

    console.log("ADD ITEM:", { data, error });

    if (!error) {
      setNewItem("");
      fetchData();
    }
  }

  async function deleteTask(id: number) {
    console.log("Deleting task id:", id);

    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .select();

    console.log("DELETE TASK RESULT:", { data, error });

    fetchData();
  }

  async function deleteItem(id: number) {
    console.log("Deleting shopping item id:", id);

    const { data, error } = await supabase
      .from("shopping")
      .delete()
      .eq("id", id)
      .select();

    console.log("DELETE SHOPPING RESULT:", { data, error });

    fetchData();
  }

  return (
    <main
      style={{
        padding: 30,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      <h1>🏡 Leu Crew HQ</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 20,
        }}
      >
        {/* TASKS */}
        <section>
          <h2>✅ Tasks</h2>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ flex: 1, padding: 8 }}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add task"
            />
            <button onClick={addTask}>Add</button>
          </div>

          <ul style={{ padding: 0, marginTop: 16 }}>
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <span>{t.text}</span>

                <button
                  onClick={() => deleteTask(t.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#d00",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* SHOPPING */}
        <section>
          <h2>🛒 Shopping</h2>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ flex: 1, padding: 8 }}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add item"
            />
            <button onClick={addItem}>Add</button>
          </div>

          <ul style={{ padding: 0, marginTop: 16 }}>
            {shopping.map((s) => (
              <li
                key={s.id}
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <span>{s.text}</span>

                <button
                  onClick={() => deleteItem(s.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#d00",
                    cursor: "pointer",
                    fontSize: 18,
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