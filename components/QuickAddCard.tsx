"use client";

type QuickAddCardProps = {
  newTask:string;
  setNewTask:(value:string)=>void;
  addTask:()=>void;

  newItem:string;
  setNewItem:(value:string)=>void;
  addItem:()=>void;

  newDiscussion:string;
  setNewDiscussion:(value:string)=>void;
  addDiscussion:()=>void;
};


export default function QuickAddCard({
  newTask,
  setNewTask,
  addTask,
  newItem,
  setNewItem,
  addItem,
  newDiscussion,
  setNewDiscussion,
  addDiscussion,
}:QuickAddCardProps){


return (

<section
style={{
border:"1px solid #ddd",
borderRadius:16,
padding:20,
marginBottom:20
}}
>

<h2>
⚡ Quick Add
</h2>


<div
style={{
display:"grid",
gap:12
}}
>


<div
style={{
display:"flex",
gap:8
}}
>

<input
style={{
flex:1,
padding:10,
borderRadius:8,
border:"1px solid #ccc"
}}

value={newTask}

onChange={(e)=>
setNewTask(e.target.value)
}

placeholder="Add a task..."
/>

<button onClick={addTask}>
✅
</button>

</div>



<div
style={{
display:"flex",
gap:8
}}
>

<input
style={{
flex:1,
padding:10,
borderRadius:8,
border:"1px solid #ccc"
}}

value={newItem}

onChange={(e)=>
setNewItem(e.target.value)
}

placeholder="Add shopping item..."
/>

<button onClick={addItem}>
🛒
</button>

</div>



<div
style={{
display:"flex",
gap:8
}}
>

<input
style={{
flex:1,
padding:10,
borderRadius:8,
border:"1px solid #ccc"
}}

value={newDiscussion}

onChange={(e)=>
setNewDiscussion(e.target.value)
}

placeholder="Add discussion topic..."
/>

<button onClick={addDiscussion}>
💬
</button>

</div>


</div>


</section>

);

}