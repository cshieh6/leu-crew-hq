"use client";

type SnapshotCardProps = {
  remainingTasks: number;
  remainingShopping: number;
  events: any[];
  pets: any[];
};



function getNextDate(
  lastCompleted:string,
  frequency:number
){

  const date =
    new Date(lastCompleted);

  date.setDate(
    date.getDate() + frequency
  );

  return date;

}



function daysUntil(
  date:Date
){

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
}: SnapshotCardProps){


  const todayString =
    new Date()
      .toISOString()
      .split("T")[0];



  const todaysEvents =
    events.filter(
      event =>
        event.date === todayString
    );



  const kobe =
    pets.find(
      pet =>
        pet.pet_name === "Kobe"
    );



  let kobeStatus =
    "Care tracker ready";



  if(kobe){

    const nextDate =
      getNextDate(
        kobe.last_completed,
        kobe.frequency_days
      );


    const days =
      daysUntil(nextDate);



    if(days < 0){

      kobeStatus =
        `🔴 Overdue by ${Math.abs(days)} days`;

    }
    else{

      kobeStatus =
        `🟢 Due in ${days} days`;

    }

  }




return (

<section
style={{
borderRadius:20,
padding:20,
background:"#ffffff",
border:"1px solid #e5e5e5",
marginBottom:20
}}
>


<h2>
☀️ Today&apos;s Snapshot
</h2>



<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(140px,1fr))",
gap:16
}}
>


<div>
<strong>
✅ Tasks
</strong>

<p>
{remainingTasks} remaining
</p>

</div>



<div>
<strong>
🛒 Shopping
</strong>

<p>
{remainingShopping} items
</p>

</div>



<div>
<strong>
📅 Calendar
</strong>

<p>
{
todaysEvents.length
}
event(s)
</p>

</div>



<div>
<strong>
🐶 Kobe
</strong>

<p>
{kobeStatus}
</p>

</div>



</div>


</section>

);

}