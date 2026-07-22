"use client";


type SnapshotCardProps = {
  remainingTasks:number;
  remainingShopping:number;
  events:any[];
  pets:any[];
  tasks:any[];
  shopping:any[];
  discussions:any[];
};



function daysUntil(date:string | Date){

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const target =
    new Date(date);

  target.setHours(
    0,
    0,
    0,
    0
  );


  return Math.ceil(
    (
      target.getTime()
      -
      today.getTime()
    )
    /
    86400000
  );

}



export default function SnapshotCard({

  remainingTasks,
  remainingShopping,
  events,
  pets,
  tasks,
  discussions

}:SnapshotCardProps){



const activeTasks =
  tasks.filter(
    task =>
      !task.completed
  );



const overdueTasks =
  activeTasks.filter(
    task =>
      task.due_date
      &&
      daysUntil(
        task.due_date
      ) < 0
  );



const activeDiscussions =
  discussions.filter(
    item =>
      !item.completed
  );



const upcomingEvents =
  events
    .filter(
      event =>
        daysUntil(event.date) >= 0
    )
    .sort(
      (a,b)=>
        new Date(a.date).getTime()
        -
        new Date(b.date).getTime()
    );



const nextEvent =
  upcomingEvents[0];



const upcomingPets =
pets
.map(pet=>{

  const nextDate =
    new Date(
      pet.last_completed
    );

  nextDate.setDate(
    nextDate.getDate()
    +
    pet.frequency_days
  );


  return {
    ...pet,
    nextDate
  };

})
.sort(
(a,b)=>
a.nextDate.getTime()
-
b.nextDate.getTime()
);



const nextPet =
  upcomingPets[0];



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
🏠 Leu Crew HQ Snapshot
</h2>



<div

style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(180px,1fr))",
gap:12
}}

>


<div>
🔴 <strong>{overdueTasks.length}</strong>
<br/>
Overdue Tasks
</div>


<div>
📋 <strong>{remainingTasks}</strong>
<br/>
Things To Do
</div>


<div>
🛒 <strong>{remainingShopping}</strong>
<br/>
Shopping Items
</div>


<div>
💬 <strong>{activeDiscussions.length}</strong>
<br/>
Discuss
</div>


</div>




{
nextEvent &&

<div
style={{
marginTop:20
}}
>

<h3>
📅 Next Event
</h3>

<div>
{nextEvent.emoji || "📌"} {nextEvent.title}
</div>

<div>
In {daysUntil(nextEvent.date)} days
</div>

</div>

}





{
nextPet &&

<div

style={{
marginTop:20
}}

>

<h3>
🐶 Kobe
</h3>


<div>
❤️ {nextPet.task}
</div>


<div>

{
daysUntil(nextPet.nextDate) < 0

?

`🔴 Overdue by ${Math.abs(daysUntil(nextPet.nextDate))} days`

:

`🟢 Due in ${daysUntil(nextPet.nextDate)} days`

}

</div>


</div>

}



</section>

);

}