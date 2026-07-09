"use client";

import type { ReactNode } from "react";
import Card from "@/components/Card";


type Event = {
  id: number;
  title: string;
  date: string;
  emoji: string | null;
  person: string | null;
};


type FamilyMember = {
  id: number;
  name: string;
  birthday: string | null;
  emoji: string | null;
};


type Task = {
  id: number;
  text: string;
  completed: boolean;
};


type UpcomingCardProps = {
  events: Event[];
  family: FamilyMember[];
  tasks: Task[];
};



function getGreeting() {

  const hour = new Date().getHours();


  if (hour < 12) {
    return "☀️ Good Morning, Leu Crew!";
  }


  if (hour < 17) {
    return "🌤️ Good Afternoon, Leu Crew!";
  }


  return "🌙 Good Evening, Leu Crew!";

}



function daysUntil(date:string){

  const today = new Date();
  today.setHours(0,0,0,0);


  const target = new Date(date);
  target.setHours(0,0,0,0);


  return Math.ceil(
    (
      target.getTime()
      -
      today.getTime()
    )
    /
    (1000*60*60*24)
  );

}



function friendlyDays(date:string){

  const days = daysUntil(date);


  if(days === 0){
    return "Today 🎉";
  }


  if(days === 1){
    return "Tomorrow";
  }


  return `In ${days} days`;

}



function nextBirthdayInfo(
  birthday:string|null
){

  if(!birthday) return null;


  const birth = new Date(birthday);
  const today = new Date();


  let nextBirthday =
    new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );


  if(nextBirthday < today){

    nextBirthday =
      new Date(
        today.getFullYear()+1,
        birth.getMonth(),
        birth.getDate()
      );

  }


  return {

    daysUntil:
      daysUntil(
        nextBirthday.toISOString()
      ),

    nextAge:
      nextBirthday.getFullYear()
      -
      birth.getFullYear()

  };

}



function Section({
  title,
  children
}:{
  title:string;
  children:ReactNode;
}){


  return (

    <div
      style={{
        marginTop:20,
        padding:16,
        borderRadius:16,
        background:"#fafafa",
        border:"1px solid #eeeeee"
      }}
    >

      <h3
        style={{
          fontSize:14,
          textTransform:"uppercase",
          letterSpacing:1,
          marginTop:0,
          marginBottom:12
        }}
      >
        {title}
      </h3>


      {children}


    </div>

  );

}




export default function UpcomingCard({
  events,
  family,
  tasks
}:UpcomingCardProps){


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


  const birthdays =
    family
      .map(member=>({

        member,

        birthday:
          nextBirthdayInfo(
            member.birthday
          )

      }))
      .filter(
        item =>
          item.birthday !== null
      )
      .sort(
        (a,b)=>
          a.birthday!.daysUntil -
          b.birthday!.daysUntil
      )
      .slice(0,3);



  const remainingTasks =
    tasks
      .filter(
        task =>
          !task.completed
      )
      .slice(0,3);



return (

<Card
emoji="🏡"
title={getGreeting()}
subtitle="What's Coming Up for the Leu Crew"
>


<p>
Here's what's ahead for the Leu Crew.
</p>



<Section title="⭐ Next Up">

{
nextEvent ?

<div>

<div
style={{
fontSize:32
}}
>
{nextEvent.emoji || "📅"}
</div>


<h3>
{nextEvent.title}
</h3>


<p>

{
nextEvent.person &&
`👤 ${nextEvent.person} • `
}

{friendlyDays(nextEvent.date)}

</p>


</div>

:

<p>
🎉 Nothing planned yet!
</p>

}

</Section>



<Section title="📆 This Week">

{
upcomingEvents.length === 0 ?

<p>
Enjoy the quiet week ☀️
</p>

:

upcomingEvents
.slice(0,5)
.map(event=>(

<div
key={event.id}
style={{
marginBottom:12
}}
>

<strong>
{event.emoji || "📅"} {event.title}
</strong>


<div>

{
event.person &&
`👤 ${event.person} • `
}

{friendlyDays(event.date)}

</div>


</div>

))

}

</Section>



<Section title="🎂 Celebrations">

{
birthdays.length === 0 ?

<p>
No birthdays coming up.
</p>

:

birthdays.map(item=>(

<div
key={item.member.id}
style={{
marginBottom:12
}}
>

<strong>
{item.member.emoji} {item.member.name}
</strong>


<div>
Turns {item.birthday!.nextAge}
{" • "}

{
item.birthday!.daysUntil === 0
?
"Today 🎉"
:
`In ${item.birthday!.daysUntil} days`
}

</div>


</div>

))

}

</Section>



<Section title="✅ Little Things">

{
remainingTasks.length === 0 ?

<p>
Everything is done! 🎉
</p>

:

remainingTasks.map(task=>(

<div key={task.id}>
☐ {task.text}
</div>

))

}

</Section>


</Card>

);

}