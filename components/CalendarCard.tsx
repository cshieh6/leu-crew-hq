"use client";

import Card from "@/components/Card";


type Event = {
  id: number;
  title: string;
  date: string;
  start_time?: string | null;
  category?: string | null;
  emoji?: string | null;
  notes?: string | null;
};



type CalendarCardProps = {
  events: Event[];
};



function formatDate(date:string){

  const [year, month, day] =
    date.split("-").map(Number);


  const localDate =
    new Date(
      year,
      month - 1,
      day
    );


  return localDate.toLocaleDateString(
    "en-US",
    {
      month:"short",
      day:"numeric",
      year:"numeric"
    }
  );

}



function formatTime(time:string|null|undefined){

  if(!time) return null;


  const [hour, minute] =
    time.split(":").map(Number);


  const date =
    new Date();

  date.setHours(
    hour,
    minute
  );


  return date.toLocaleTimeString(
    "en-US",
    {
      hour:"numeric",
      minute:"2-digit"
    }
  );

}



export default function CalendarCard({
  events
}:CalendarCardProps){


return (

<Card
emoji="📅"
title="Calendar"
subtitle="Upcoming family events"
>


{
events.length === 0 ?

<p>
No upcoming events.
</p>


:

<div
style={{
display:"flex",
flexDirection:"column",
gap:12
}}
>


{
events.map(event=>(


<div
key={event.id}
style={{
padding:12,
borderRadius:12,
background:"#f8f8f8"
}}
>


<strong>
{event.emoji || "📅"} {event.title}
</strong>



<p
style={{
margin:"6px 0 0"
}}
>

📅 {formatDate(event.date)}

{
event.start_time &&
(
<>
{" · "}
⏰ {formatTime(event.start_time)}
</>
)
}

</p>



{
event.notes &&

<p
style={{
marginTop:8,
whiteSpace:"pre-wrap"
}}
>
{event.notes.replace(/<[^>]*>/g,"")}
</p>

}



</div>


))

}


</div>

}


</Card>

);

}