"use client";

import Card from "@/components/Card";
import { getEventInfo } from "@/lib/eventUtils";


type Event = {
  id: number;
  title: string;
  date: string;
  start_time?: string | null;
  emoji?: string | null;
  notes?: string | null;
};



function formatDate(date:string){

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      weekday:"long",
      month:"short",
      day:"numeric",
    }
  );

}



function formatShortDate(date:string){

  const today =
    new Date();

  today.setHours(0,0,0,0);


  const eventDate =
    new Date(date);

  eventDate.setHours(0,0,0,0);


  const difference =
    Math.round(
      (
        eventDate.getTime()
        -
        today.getTime()
      )
      /
      86400000
    );


  if(difference === 0){
    return "⭐ Today";
  }


  if(difference === 1){
    return "Tomorrow";
  }


  return formatDate(date);

}




function formatTime(time:string | null | undefined){

  if(!time) return "";


  const [
    hour,
    minute
  ] = time.split(":");


  const date =
    new Date();


  date.setHours(
    Number(hour),
    Number(minute)
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
  events,
}:{
  events:Event[];
}){


  const today =
    new Date();

  today.setHours(
    0,0,0,0
  );


  const sevenDays =
    new Date();

  sevenDays.setDate(
    sevenDays.getDate() + 7
  );


  const upcomingEvents =
    events
      .filter(event=>{

        const eventDate =
          new Date(event.date);

        eventDate.setHours(
          0,0,0,0
        );


        return (
          eventDate >= today &&
          eventDate <= sevenDays
        );

      })
      .sort(
        (a,b)=>
          new Date(a.date).getTime()
          -
          new Date(b.date).getTime()
      );



  const displayedEvents =
    upcomingEvents.slice(
      0,
      5
    );


  const remaining =
    upcomingEvents.length -
    displayedEvents.length;



  const groupedEvents =
    displayedEvents.reduce(
      (
        groups,
        event
      )=>{


        if(!groups[event.date]){
          groups[event.date] = [];
        }


        groups[event.date].push(
          event
        );


        return groups;


      },
      {} as Record<string,Event[]>
    );





return (

<Card
emoji="📅"
title="Calendar"
subtitle="Next 7 days"
>


{
displayedEvents.length === 0 ?

<p>
No events this week 🎉
</p>

:

Object.entries(groupedEvents)
.map(
([date,dayEvents])=>(


<div
key={date}
style={{
marginBottom:18
}}
>


<h3
style={{
fontSize:14,
marginBottom:8
}}
>
{formatShortDate(date)}
</h3>



{
dayEvents.map(event=>{


const info =
getEventInfo(
event.title
);



return (

<div
key={event.id}
style={{
padding:"10px 0",
borderBottom:"1px solid #eee"
}}
>


<strong>

{info.categoryEmoji}

{" "}

{info.cleanTitle}

</strong>



<div>
{info.personEmoji}
{" "}
{info.person}
</div>



<div
style={{
fontSize:14,
marginTop:4
}}
>

⏰

{" "}

{
formatTime(
event.start_time
)
}

</div>



</div>

);


})

}



</div>


))

}



{
remaining > 0 && (

<p
style={{
marginTop:12,
fontSize:14
}}
>

+ {remaining} more events this week

</p>

)

}


</Card>

);

}