"use client";

import TaskCard from "@/components/TaskCard";
import BottomNav from "../BottomNav";

export default function TasksScreen({
  tasks,
  newTask,
  setNewTask,
  newTaskDueDate,
  setNewTaskDueDate,
  addTask,
  deleteTask,
  toggleTask,
  activeTab,
  setActiveTab
}:any){

return (

<main
style={{
padding:20,
maxWidth:1200,
margin:"0 auto",
fontFamily:"system-ui"
}}
>

<h1>
✅ Tasks
</h1>


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


<BottomNav
activeTab={activeTab}
setActiveTab={setActiveTab}
/>

</main>

);

}
