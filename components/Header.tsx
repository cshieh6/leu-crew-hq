"use client";

import CalendarSync from "./CalendarSync";


function getGreeting(){

  const hour = new Date().getHours();

  if(hour < 12){
    return "Good morning";
  }

  if(hour < 18){
    return "Good afternoon";
  }

  return "Good evening";

}



function formatToday(){

  return new Date().toLocaleDateString(
    "en-US",
    {
      weekday:"long",
      month:"long",
      day:"numeric",
      year:"numeric",
    }
  );

}



export default function Header(){

  return (

    <header
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:20,
        flexWrap:"wrap",
        marginBottom:24
      }}
    >

      <div>

        <h1
          style={{
            margin:0,
            fontSize:32
          }}
        >
          🏡 Leu Crew HQ
        </h1>


        <p
  style={{
    marginTop:8,
    marginBottom:4,
    color:"#666",
    fontSize:15
  }}
>
  {getGreeting()} 👋
</p>


        <p
          style={{
            margin:0,
            color:"#888",
            fontSize:14
          }}
        >
          {formatToday()}
        </p>


      </div>


      <CalendarSync />


    </header>

  );

}