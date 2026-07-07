"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ShoppingCard from "@/components/ShoppingCard";
import DashboardCard from "@/components/DashboardCard";
import SnapshotCard from "@/components/SnapshotCard";
import FamilyCard from "@/components/FamilyCard";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [shopping, setShopping] = useState<any[]>([]);
  const [family, setFamily] = useState<any[]>([]);

  const [newTask, setNewTask] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: tasksData, error: taskError } =
      await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
          ascending: true,
        });


    const { data: shoppingData, error: shoppingError } =
      await supabase
        .from("shopping")
        .select("*")
        .order("created_at", {
          ascending: true,
        });


    const { data: familyData, error: familyError } =
      await supabase
        .from("family_members")
        .select("*")
        .order("display_order", {
          ascending: true,
        });


    console.log(
      "FETCH TASKS ERROR:",
      taskError
    );

    console.log(
      "FETCH SHOPPING ERROR:",
      shoppingError
    );

    console.log(
      "FETCH FAMILY ERROR:",
      familyError
    );


    setTasks(tasksData || []);
    setShopping(shoppingData || []);
    setFamily(familyData || []);
  }


  async function addTask() {
    if (!newTask.trim()) return;

    const { error } =
      await supabase
        .from("tasks")
        .insert({
          text: newTask,
          completed: false,
        });


    console.log(
      "ADD TASK ERROR:",
      error
    );


    if (!error) {
      setNewTask("");
      fetchData();
    }
  }


  async function addItem() {
    if (!newItem.trim()) return;

    const { error } =
      await supabase
        .from("shopping")
        .insert({
          text: newItem,
          completed: false,
        });


    console.log(
      "ADD SHOPPING ERROR:",
      error
    );


    if (!error) {
      setNewItem("");
      fetchData();
    }
  }


  async function deleteTask(id: number) {
    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    fetchData();
  }


  async function deleteItem(id: number) {
    await supabase
      .from("shopping")
      .delete()
      .eq("id", id);

    fetchData();
  }


  async function toggleTask(
    id: number,
    completed: boolean
  ) {
    await supabase
      .from("tasks")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    fetchData();
  }


  async function toggleShoppingItem(
    id: number,
    completed: boolean
  ) {
    await supabase
      .from("shopping")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    fetchData();
  }


  const remainingTasks =
    tasks.filter(
      (task) => !task.completed
    ).length;


  const remainingShopping =
    shopping.filter(
      (item) => !item.completed
    ).length;


  return (
    <main
      style={{
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >

      <Header />


      <SnapshotCard
        remainingTasks={remainingTasks}
        remainingShopping={remainingShopping}
      />


      <div
        style={{
          marginTop: 24,
        }}
      >
        <FamilyCard
          members={family}
        />
      </div>



      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: 24,
          marginTop: 24,
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
          toggleShoppingItem={
            toggleShoppingItem
          }
        />



        <DashboardCard
          title="Calendar"
          icon="📅"
          count="Coming soon"
        >
          <p>
            Calendar integration coming soon.
          </p>
        </DashboardCard>



        <DashboardCard
          title="Meals"
          icon="🍽️"
          count="Coming soon"
        >
          <p>
            Meal planning coming soon.
          </p>
        </DashboardCard>



        <DashboardCard
          title="Pets"
          icon="🐶"
          count="Kobe"
        >
          <p>
            Kobe tracker coming soon.
          </p>
        </DashboardCard>



        <DashboardCard
          title="Finances"
          icon="💰"
          count="Coming soon"
        >
          <p>
            Family budget coming soon.
          </p>
        </DashboardCard>


      </div>

    </main>
  );
}