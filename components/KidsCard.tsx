"use client";

import Card from "@/components/Card";


type Event = {
  id:number;
  title:string;
  date:string;
  emoji?:string | null;
  person?:string | null;
};



type KidsCardProps = {
  events:Event[];
};



function daysUntil(date:string){

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



function friendlyDate(date:string){

  const days =
    daysUntil(date);


  if(days === 0)
    return "Today 🎉";


  if(days === 1)
    return "Tomorrow";


  if(days < 7)
    return `In ${days} days`;


  return new Date(date)
    .toLocaleDateString(
      "en-US",
      {
        month:"short",
        day:"numeric"
      }
    );

}




function EventList({
  events
}:{
  events:Event[]
}){


  if(events.length === 0){

    return (
      <p>
        No upcoming events.
      </p>
    );

  }



  return (

    <div>

      {
        events.map(event=>(

          <div
          key={event.id}
          style={{
            marginBottom:14
          }}
          >

            <strong>
              {event.emoji || "📅"} {event.title}
            </strong>


            <div>
              📆 {friendlyDate(event.date)}
            </div>


          </div>

        ))
      }

    </div>

  );

}





export default function KidsCard({
  events
}:KidsCardProps){


  const upcoming =
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



  const arthurEvents =
    upcoming
      .filter(
        event =>
          event.title.includes("[Arthur]")
          ||
          event.title.includes("Arthur")
      )
      .slice(0,3);



  const andrewEvents =
    upcoming
      .filter(
        event =>
          event.title.includes("[Andrew]")
          ||
          event.title.includes("Andrew")
      )
      .slice(0,3);




return (

<Card
emoji="🎒"
title="Kids HQ"
subtitle="Arthur & Andrew"
>


<h3>
🐯 Arthur
</h3>

<EventList
events={arthurEvents}
/>



<hr
style={{
margin:"20px 0",
border:"none",
borderTop:"1px solid #eee"
}}
/>



<h3>
🐰 Andrew
</h3>

<EventList
events={andrewEvents}
/>



</Card>

);

}