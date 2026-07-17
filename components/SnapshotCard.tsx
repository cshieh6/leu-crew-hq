"use client";

type Event = {
  id:number;
  title:string;
  date:string;
  emoji?:string|null;
};


type SnapshotCardProps = {
  remainingTasks:number;
  remainingShopping:number;
  events:Event[];
};



function parseLocalDate(date:string){

  const [
    year,
    month,
    day
  ] =
    date.split("-").map(Number);


  return new Date(
    year,
    month - 1,
    day
  );

}



function isToday(date:string){

  const today =
    new Date();


  const eventDate =
    parseLocalDate(date);


  return (
    today.getFullYear()
    ===
    eventDate.getFullYear()

    &&

    today.getMonth()
    ===
    eventDate.getMonth()

    &&

    today.getDate()
    ===
    eventDate.getDate()
  );

}



export default function SnapshotCard({

  remainingTasks,
  remainingShopping,
  events

}:SnapshotCardProps){


const todaysEvent =
  events.find(
    event =>
      isToday(event.date)
  );



return (

<section
style={{
borderRadius:20,
padding:24,
background:"#f8f8f8",
border:"1px solid #ddd",
marginBottom:24
}}
>


<h2
style={{
marginTop:0,
marginBottom:20
}}
>
☀️ Today's Snapshot
</h2>



<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(140px, 1fr))",
gap:16
}}
>


<div>
<strong>✅ Tasks</strong>
<p style={{margin:"6px 0"}}>
{remainingTasks} remaining
</p>
</div>



<div>
<strong>🛒 Shopping</strong>
<p style={{margin:"6px 0"}}>
{remainingShopping} items
</p>
</div>



<div>
<strong>📅 Calendar</strong>

<p style={{margin:"6px 0"}}>
{
todaysEvent
?
`${todaysEvent.emoji || "📅"} ${todaysEvent.title}`
:
"No events today 🎉"
}
</p>

</div>



<div>
<strong>🐶 Kobe</strong>

<p style={{margin:"6px 0"}}>
Care tracker coming soon
</p>

</div>



</div>


</section>

);

}