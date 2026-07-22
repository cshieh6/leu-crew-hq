"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ShoppingCard from "@/components/ShoppingCard";
import SnapshotCard from "@/components/SnapshotCard";
import FamilyCard from "@/components/FamilyCard";
import CalendarCard from "@/components/CalendarCard";
import UpcomingCard from "@/components/UpcomingCard";
import PetCard from "@/components/PetCard";
import KidsCard from "@/components/KidsCard";
import DiscussCard from "@/components/DiscussCard";
import QuickAddCard from "@/components/QuickAddCard";

export default function Home() {


  const [tasks,setTasks] =
    useState<any[]>([]);

  const [shopping,setShopping] =
    useState<any[]>([]);

  const [family,setFamily] =
    useState<any[]>([]);

  const [events,setEvents] =
    useState<any[]>([]);

  const [pets,setPets] =
    useState<any[]>([]);

const [discussions,setDiscussions] =
  useState<any[]>([]);

const [newDiscussion,setNewDiscussion] =
  useState("");

const [newDiscussionCategory,setNewDiscussionCategory] =
  useState("General");

const [newDiscussionPriority,setNewDiscussionPriority] =
  useState("Normal");


  const [newTask,setNewTask] =
    useState("");

const [newTaskDueDate,setNewTaskDueDate] =
  useState("");

  const [newItem,setNewItem] =
  useState("");

const [newItemStore,setNewItemStore] =
  useState("Costco");

  const [newCategory,setNewCategory] =
  useState("General");


  useEffect(()=>{

    fetchData();

  },[]);




  async function fetchData(){

console.log("FETCH START");
   const {
  data:tasksData,
  error:tasksError
} =
  await supabase
    .from("tasks")
    .select("*")
    .order(
      "created_at",
      {
        ascending:true
      }
    );


    const {
      data:shoppingData,
      error:shoppingError
    }
    =
      await supabase
        .from("shopping")
        .select("*")
        .order(
          "created_at",
          {
            ascending:true
          }
        );



    const {
      data:familyData,
      error:familyError
    }
    =
      await supabase
        .from("family_members")
        .select("*")
        .order(
          "display_order",
          {
            ascending:true
          }
        );



    const {
      data:eventsData,
      error:eventsError
    }
    =
      await supabase
        .from("events")
        .select("*")
        .order(
          "date",
          {
            ascending:true
          }
        );



    const {
      data:petsData,
      error:petsError
    }
    =
      await supabase
        .from("pet_care")
        .select("*")
        .order(
          "id",
          {
            ascending:true
          }
        );

const {
  data:discussionsData,
  error:discussionsError
}
=
  await supabase
    .from("discussions")
    .select("*")
    .order(
      "created_at",
      {
        ascending:true
      }
    );

console.log("DISCUSSIONS QUERY FINISHED");

    console.log(
      "TASK ERROR:",
      tasksError
    );

    console.log(
      "SHOPPING ERROR:",
      shoppingError
    );

    console.log(
      "FAMILY ERROR:",
      familyError
    );

    console.log(
      "EVENT ERROR:",
      eventsError
    );

    console.log(
      "PET ERROR:",
      petsError
    );

console.log(
  "DISCUSSIONS ERROR:",
  discussionsError
);

    setTasks(
      tasksData || []
    );

    setShopping(
      shoppingData || []
    );

    setFamily(
      familyData || []
    );

    setEvents(
      eventsData || []
    );

    setPets(
  petsData || []
);

setDiscussions(
  discussionsData || []
);

console.log("FETCH COMPLETE");

}








  async function addTask(){

  if(!newTask.trim())
    return;


 await supabase
  .from("tasks")
  .insert({
    text:newTask,
    due_date:newTaskDueDate || null,
    completed:false
  });


setNewTask("");

setNewTaskDueDate("");

fetchData();

}







  async function addItem(){

  if(!newItem.trim())
    return;


  await supabase
    .from("shopping")
    .insert({
      text:newItem,
      store:newItemStore,
      completed:false
    });


  setNewItem("");

  fetchData();

}







  async function deleteTask(
    id:number
  ){

    await supabase
      .from("tasks")
      .delete()
      .eq(
        "id",
        id
      );


    fetchData();

  }







  async function deleteItem(
    id:number
  ){

    await supabase
      .from("shopping")
      .delete()
      .eq(
        "id",
        id
      );


    fetchData();

  }







  async function toggleTask(
    id:number,
    completed:boolean
  ){

    await supabase
      .from("tasks")
      .update({
        completed:
          !completed
      })
      .eq(
        "id",
        id
      );


    fetchData();

  }







  async function toggleShoppingItem(
    id:number,
    completed:boolean
  ){

    await supabase
      .from("shopping")
      .update({
        completed:
          !completed
      })
      .eq(
        "id",
        id
      );


    fetchData();

  }

async function addDiscussion(){

  if(!newDiscussion.trim())
    return;


  await supabase
    .from("discussions")
    .insert({
      text:newDiscussion,
      category:newDiscussionCategory,
      priority:newDiscussionPriority,
      completed:false
    });


  setNewDiscussion("");

  fetchData();

}



async function deleteDiscussion(
  id:number
){

  await supabase
    .from("discussions")
    .delete()
    .eq(
      "id",
      id
    );

  fetchData();

}



async function toggleDiscussion(
  id:number,
  completed:boolean
){

  await supabase
    .from("discussions")
    .update({
      completed:
        !completed
    })
    .eq(
      "id",
      id
    );

  fetchData();

}





  const remainingTasks =
    tasks.filter(
      task =>
        !task.completed
    ).length;



  const remainingShopping =
    shopping.filter(
      item =>
        !item.completed
    ).length;







return (

<main
style={{
padding:20,
maxWidth:1200,
margin:"0 auto",
fontFamily:"system-ui"
}}
>


<Header />

<QuickAddCard

newTask={newTask}
setNewTask={setNewTask}
addTask={addTask}

newItem={newItem}
setNewItem={setNewItem}
addItem={addItem}

newDiscussion={newDiscussion}
setNewDiscussion={setNewDiscussion}
addDiscussion={addDiscussion}

/>


<SnapshotCard

remainingTasks={
  remainingTasks
}

remainingShopping={
  remainingShopping
}

events={
  events
}

pets={
  pets
}

tasks={
  tasks
}

shopping={
  shopping
}

discussions={
  discussions
}

/>





<UpcomingCard
events={
  events
}
family={
  family
}
tasks={
  tasks
}
/>





<FamilyCard
members={
  family
}
/>





<div className="dashboard-grid">





<TaskCard

tasks={
  tasks
}

newTask={
  newTask
}

setNewTask={
  setNewTask
}

newTaskDueDate={
  newTaskDueDate
}

setNewTaskDueDate={
  setNewTaskDueDate
}

addTask={
  addTask
}

deleteTask={
  deleteTask
}

toggleTask={
  toggleTask
}

/>






<ShoppingCard
shopping={
  shopping
}
newItem={
  newItem
}
setNewItem={
  setNewItem
}
newItemStore={
  newItemStore
}
setNewItemStore={
  setNewItemStore
}
addItem={
  addItem
}
deleteItem={
  deleteItem
}
toggleShoppingItem={
  toggleShoppingItem
}
/>



<CalendarCard
events={
  events
}
/>






<PetCard
pets={
  pets
}
refreshPets={
  fetchData
}
/>




<KidsCard
events={
  events
}
/>





<DiscussCard
  discussions={discussions}
  newDiscussion={newDiscussion}
  setNewDiscussion={setNewDiscussion}

  newDiscussionCategory={
    newDiscussionCategory
  }

  setNewDiscussionCategory={
    setNewDiscussionCategory
  }

  newDiscussionPriority={
    newDiscussionPriority
  }

  setNewDiscussionPriority={
    setNewDiscussionPriority
  }

  addDiscussion={addDiscussion}
  deleteDiscussion={deleteDiscussion}
  toggleDiscussion={toggleDiscussion}
/>





</div>


</main>

);


}