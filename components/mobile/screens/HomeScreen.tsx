"use client";

import Header from "@/components/Header";
import QuickAddCard from "@/components/QuickAddCard";
import SnapshotCard from "@/components/SnapshotCard";
import UpcomingCard from "@/components/UpcomingCard";
import FamilyCard from "@/components/FamilyCard";
import TaskCard from "@/components/TaskCard";
import ShoppingCard from "@/components/ShoppingCard";
import CalendarCard from "@/components/CalendarCard";
import PetCard from "@/components/PetCard";
import KidsCard from "@/components/KidsCard";
import DiscussCard from "@/components/DiscussCard";
import BottomNav from "../BottomNav";


export default function HomeScreen({
  tasks,
  shopping,
  family,
  events,
  pets,
  discussions,

  newTask,
  setNewTask,
  newTaskDueDate,
  setNewTaskDueDate,
  addTask,
  deleteTask,
  toggleTask,

  newItem,
  setNewItem,
  newItemStore,
  setNewItemStore,
  addItem,
  deleteItem,
  toggleShoppingItem,

  newDiscussion,
  setNewDiscussion,
  newDiscussionCategory,
  setNewDiscussionCategory,
  newDiscussionPriority,
  setNewDiscussionPriority,
  addDiscussion,
  deleteDiscussion,
  toggleDiscussion,

  activeTab,
  setActiveTab

}:any){


const remainingTasks =
tasks.filter(
(task:any)=>!task.completed
).length;


const remainingShopping =
shopping.filter(
(item:any)=>!item.completed
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

remainingTasks={remainingTasks}

remainingShopping={remainingShopping}

events={events}

pets={pets}

tasks={tasks}

shopping={shopping}

discussions={discussions}

/>


<UpcomingCard
events={events}
family={family}
tasks={tasks}
/>


<FamilyCard
members={family}
/>


<div className="dashboard-grid">


<TaskCard

tasks={tasks}
newTask={newTask}
setNewTask={setNewTask}
newTaskDueDate={newTaskDueDate}
setNewTaskDueDate={setNewTaskDueDate}
addTask={addTask}
deleteTask={deleteTask}
toggleTask={toggleTask}

/>


<ShoppingCard

shopping={shopping}
newItem={newItem}
setNewItem={setNewItem}
newItemStore={newItemStore}
setNewItemStore={setNewItemStore}
addItem={addItem}
deleteItem={deleteItem}
toggleShoppingItem={toggleShoppingItem}

/>


<CalendarCard
events={events}
/>


<PetCard
pets={pets}
refreshPets={()=>{}}
/>


<KidsCard
events={events}
/>


<DiscussCard

discussions={discussions}

newDiscussion={newDiscussion}

setNewDiscussion={setNewDiscussion}

newDiscussionCategory={newDiscussionCategory}

setNewDiscussionCategory={setNewDiscussionCategory}

newDiscussionPriority={newDiscussionPriority}

setNewDiscussionPriority={setNewDiscussionPriority}

addDiscussion={addDiscussion}

deleteDiscussion={deleteDiscussion}

toggleDiscussion={toggleDiscussion}

/>


</div>


<BottomNav
activeTab={activeTab}
setActiveTab={setActiveTab}
/>


</main>

);

}