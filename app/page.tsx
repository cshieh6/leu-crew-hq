"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ShoppingCard from "@/components/ShoppingCard";
import DashboardCard from "@/components/DashboardCard";

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
      .insert({
        text: newTask,
        completed: false,
      });

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
      .insert({
        text: newItem,
        completed: false,
      });

    console.log("ADD SHOPPING ERROR:", error);

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

    console.log("DELETE SHOPPING ERROR:", error);

    fetchData();
  }

  async function toggleTask(id: number, completed: boolean) {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    console.log("TOGGLE TASK ERROR:", error);

    fetchData();
  }

  async function toggleShoppingItem(
    id: number,
    completed: boolean
  ) {
    const { error } = await supabase
      .from("shopping")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    console.log("TOGGLE SHOPPING ERROR:", error);

    fetchData();
  }

  return (
    <main
      style={{
        padding: 32,
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      <Header />

      {/* Family Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <DashboardCard
          title="Family Today"
          icon="👨‍👩‍👦"
        >
          <p>Arthur 🎒</p>
          <p>Andrew 🧸</p>
          <p>Kobe 🐶</p>
        </DashboardCard>
      </div>


      {/* Main Tools */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <TaskCard
          tasks={tasks}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />

        <ShoppingCard
          shopping={shopping}
          newItem={newItem}
          setNewItem={setNewItem}
          addItem={addItem}
          deleteItem={deleteItem}
          toggleShoppingItem={toggleShoppingItem}
        />


        <DashboardCard
          title="Calendar"
          icon="📅"
          count="Coming soon"
        >
          <p>No upcoming events yet.</p>
        </DashboardCard>


        <DashboardCard
          title="Meals"
          icon="🍽️"
          count="Coming soon"
        >
          <p>Meal planning coming soon.</p>
        </DashboardCard>


        <DashboardCard
          title="Pets"
          icon="🐶"
          count="Kobe"
        >
          <p>Kobe tracker coming soon.</p>
        </DashboardCard>


        <DashboardCard
          title="Finances"
          icon="💰"
          count="Coming soon"
        >
          <p>Family budget coming soon.</p>
        </DashboardCard>

      </div>
    </main>
  );
}