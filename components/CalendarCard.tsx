"use client";

import Card from "@/components/Card";
import { getEventInfo } from "@/lib/eventUtils";


type Event = {
  id:number;
  title:string;
  date:string;
  start_time?:string | null;
  emoji?:string | null;
  notes?:string | null;
};



function daysUntil(date:string){

  const today =
    new Date();

  today.setHours(0,0,0,0);


  const target =
    new Date(date);

  target.setHours(0,0,0,0);


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



function formatDate(date:string){

return new Date(date)
.toLocaleDateString(
"en-US",
{
 weekday:"long",
 month:"short",
 day:"numeric"
}
);

}



function formatTime(
time:string | null | undefined
){

if(!time)
return "";

const [
hour,
minute
]=time.split(":");


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



function EventRow({
event
}:{
event:Event
}){


const info =
getEventInfo(
event.title
);


return (

<div

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



{
event.start_time &&

<div
style={{
fontSize:14
}}
>

⏰ {formatTime(event.start_time)}

</div>

}



{
event.notes &&

<div
style={{
fontSize:14,
marginTop:4
}}
>

📝 {event.notes}

</div>

}


</div>

);

}





export default function CalendarCard({

events

}:{
events:Event[]
}){


const todayEvents =
events.filter(
event =>
daysUntil(event.date) === 0
);



const weekEvents =
events.filter(
event =>
daysUntil(event.date) > 0
&&
daysUntil(event.date) <= 7
);



const laterEvents =
events.filter(
event =>
daysUntil(event.date) > 7
);



function sortEvents(
items:Event[]
){

return items.sort(
(a,b)=>
new Date(a.date).getTime()
-
new Date(b.date).getTime()
);

}



return (

<Card

emoji="📅"
title="Calendar"
subtitle="Family schedule"

>


{
todayEvents.length > 0 &&

<div>

<h3>
⭐ Today
</h3>


{
sortEvents(todayEvents)
.map(event=>(

<EventRow
key={event.id}
event={event}
/>

))

}

</div>

}





{
weekEvents.length > 0 &&

<div
style={{
marginTop:20
}}
>

<h3>
📆 This Week
</h3>


{
sortEvents(weekEvents)
.slice(0,5)
.map(event=>(

<EventRow
key={event.id}
event={event}
/>

))

}


</div>

}





{
laterEvents.length > 0 &&

<div
style={{
marginTop:20
}}
>

<h3>
🔜 Coming Up
</h3>


{
sortEvents(laterEvents)
.slice(0,3)
.map(event=>(

<EventRow
key={event.id}
event={event}
/>

))

}


</div>

}





{
events.length === 0 &&

<p>
No upcoming events 🎉
</p>

}


</Card>

);

}